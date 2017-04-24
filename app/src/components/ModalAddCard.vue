<template>
    <div>
        <button type="button" class="btn btn-default pull-right" aria-label="Left Align" data-toggle="modal" :data-target="'#myModal'+listId">
            +
        </button>
        <!-- Modal -->
        <div class="modal fade" :id="'myModal'+listId" tabindex="-1" role="dialog" :aria-labelledby="'myModal'+listId+'Label'">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" :id="'myModal'+listId+'Label'">Create Card</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>Card content</label>
                                <textarea v-model="cardcontent" class="form-control" placeholder="Add your card content here !" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onCreate">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'modaladdcard',
    props: ['listId'],

    methods: {
        /**
         * onCreate - proceed to new card creation
         */
        onCreate() {
            let newCard = {
                name: this.cardcontent,
                desc: "powered by Treller",
                pos: "top",
                due: null,
                idList: this.listId
            };

            Trello.post('/cards/', newCard, this.onSuccessAddCard, this.onErrorAddCard);


        },

        /**
         * onSuccessAddCard - adding card
         * @param  Object added card
         */
        onSuccessAddCard(response) {
            this.$emit('card-created', response)
            this.cardcontent = ""
        },

        /**
         * onErrorAddCard - an error occured during adding
         * @param  {[type]} error [description]
         * @return {[type]}       [description]
         */
        onErrorAddCard(error) {
            console.error(error)
        }
    },
    data() {
        return {
            cardcontent: ""
        };
    },
}
</script>
