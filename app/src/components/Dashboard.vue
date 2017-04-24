<template>
    <div>
        <div v-if="lastError.length>0" class="panel panel-danger">
            <div class="panel-heading">
                <h3 class="panel-title">An Error Ocurred</h3> </div>
            <div class="panel-body"> {{lastError}} </div>
        </div>
        <div v-if="lastError.length==0" class="jumbotron">
            <h1>Welcome on board {{$route.params.boardName}} !</h1>
        </div>
        <div v-if="lastError.length==0" class="jumbotron">
            <div v-for='list in lists' class="col-xs">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <div class="row"><span class="col-xs-2">{{list.name}}</span>
                            <modaladdcard class="col-xs-10" :listId="list.id" v-on:card-created="onCardCreated"></modaladdcard>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div>
                            <draggable :id="list.id" v-model="cards[list.id]" :options="{group:'cards'}" @change="onChangeCard" :move="onMoveCard" @end="onEnd" style="min-height:1em">
                                <div class="bg-success cards" v-for="card in cards[list.id]" :id="card.id">
                                    <div :key="card.id" @click=" card.fixed=! card.fixed">{{card.name}}</div>
                                </div>
                            </draggable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modaladdcard from './ModalAddCard.vue'
import draggable from 'vuedraggable'

export default {
    name: 'dashboard',

    components: {
        modaladdcard,
        draggable
    },

    mounted() {
        Trello.get('/boards/' + this.$route.params.boardId + '/lists', this.onSuccessList, this.onFetchError);
    },
    data() {
        return {
            lists: [],
            cards: {},
            idList: -1,
            lastError: ''
        }
    },
    methods: {

        /**
         * onCardCreated - the  user computes a new card
         * @param  Object newCard - data of the new card return by trello API
         */
        onCardCreated(newCard) {
            this.cards[newCard.idList].unshift(newCard)
            this.$forceUpdate()
        },

        /**
         * onEnd - before onChangeCard card
         * @param  Event evt
         */
        onEnd(evt) {
            this.$forceUpdate()
        },

        /**
         * [onChangeCard description]
         * @param  {[type]} evt [description]
         * @return {[type]}     [description]
         */
        onChangeCard(evt) {

            if (!!evt.moved) {
                this.moveCard(evt.moved.element.id, {
                    pos: evt.moved.newIndex * 10000
                });
            }
            if (!!evt.added) {
                this.moveCard(evt.added.element.id, {
                    idList: this.idList,
                    pos: evt.added.newIndex * 10000
                });
                this.idList = -1;
            }
        },

        /**
         * moveCard - inside a same list
         * PUT /1/cards/[card id or shortlink]/pos
         * @param  {[type]} cardId [description]
         * @param  {[type]} params [description]
         */
        moveCard(cardId, params) {
            Trello.put('/cards/' + cardId, params, this.onSuccessMoveCard, this.onFetchError);
        },

        /**
         * onSuccessMoveCard - we have stored the card movement 
         * @param  Object card
         */
        onSuccessMoveCard(card) {
            //console.log('onSuccessMoveCard', card)
        },

        /**
         * onMoveCard - we are moving an item in the air
         * see https://github.com/SortableJS/Vue.Draggable#move
         * @param  Object options.relatedContext  context linked to dragged element
         * @param  Object options.draggedContext context linked to current drag operation
         */
        onMoveCard({
            relatedContext,
            draggedContext
        }) {

            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;

            //save potential target list
            this.idList = relatedContext.component.$el.id;

            return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        },

        /**
         * onSuccessList - callback fetch lists succes
         * @param  Array lists
         */
        onSuccessList(lists) {
            this.lists = lists;

            this.lists.forEach((list, indexList) => {

                this.cards[list.id] = Object.assign([]);
                Trello.get('/lists/' + list.id + '/cards/', this.onSuccessCards, this.onFetchError);

            })

            this.$forceUpdate()

        },

        /**
         * onSuccessCards - retrieve cards from a list
         * @param  Array cards - of a list
         */
        onSuccessCards(cards) {

            if (cards.length > 0) {
                this.cards[cards[0]['idList']].push(...cards)
            }

            this.$forceUpdate()
        },

        /**
         * onFetchError - callback error
         * @param  Object data
         * @return {[type]}      [description]
         */
        onFetchError(data) {
            this.lastError = data.responseText;
        }
    }
}
</script>
<style>
.cards {
    margin: 0.4em;
    padding: 0.45em;
}

.sortable-ghost{
    background-color: #337ab7;
}

.sortable-chosen{
    opacity:0.5;
}

</style>
