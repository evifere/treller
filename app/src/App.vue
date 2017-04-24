<template>
    <div id="app" class="wrap">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-left">
                    <li>
                        <router-link :to="{ path: '/home' }" replace>Home</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <keep-alive include="Home" exlude="Dashboard,ModalAddCard">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
export default {
    name: 'app',
    props: ['Trello'],
    created() {
        console.log('app created');
    },
    mounted() {
        console.log('app mounted');
    },

    data() {
        return {
            user: 'Evifere'
        }
    }
}
</script>
<style scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

img {
    width: 200px;
    height: 200px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
