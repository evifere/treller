<template>
    <div class="jumbotron">
        <h1>Welcome to Treller!</h1>
        <p class="lead">Trello version {{ getTrelloVersion() }} loaded</p>
        <p v-if="boards.length===0">
            <button type="button" class="btn btn-default" @click="authenticate">Authenticate</button>
        </p>
        <table class="table table-bordered table-striped" v-if="boards.length>0">
            <thead>
                <tr>
                    <th class="bg-primary"><span class="center-block">DashBoard</span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="board in boards" v-model="boards">
                    <td>
                        <router-link :to="{ name: 'dashboard' ,params:{boardName:board.name,boardId:board.id}}">{{board.name}}</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'Home',

    data() {
        return {
            boards: []
        }
    },
    methods: {
        /**
         * getTrelloVersion - trello version helper
         * @return String version of trello
         */
        getTrelloVersion() {
            return Trello.version()
        },

        /**
         * authenticate - proceed authentification
         */
        authenticate() {

            Trello.authorize({
                type: 'popup',
                name: 'myAwesome App',
                scope: {
                    read: 'true',
                    write: 'true'
                },
                expiration: 'never',
                success: this.authenticationSuccess,
                error: this.authenticationFailure
            });
        },

        /**
         * authenticationSuccess - proceed boards listings
         * @param  Object data - succes response
         */
        authenticationSuccess(data) {
            Trello.get('/member/me/boards', this.onLoadBoards, this.onFetchError);
        },

        /**
         * authenticationFailure - process error when auth failed
         * @param  Object data
         */
        authenticationFailure(data) {
            console.error('authenticationFailure', data);
        },

        /**
         * onFetchError - generic fecthError
         * @param  Object data - error response
         */
        onFetchError(data) {
            console.error(data);
        },

        /**
         * onLoadBoards - set boards on callback
         * @param  Array boards
         */
        onLoadBoards(boards) {
            this.boards = boards;
        }
    }
}
</script>
