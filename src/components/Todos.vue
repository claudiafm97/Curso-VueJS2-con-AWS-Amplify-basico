<template>
<div class="mt-5">
    <h2 class="text-center">Listado de tareas</h2>

    <b-row>
        <b-col cols="8">
            <form-group :validator="$v.todo" label="Tarea">
                <template slot-scope="{ attrs, listeners }">
                    <b-form-input v-model="todo" v-bind="attrs" v-on="listeners"></b-form-input>
                </template>
            </form-group>
        </b-col>
        <b-col cols="4">
            <b-button class="btn-block" style="margin-top: 32px; background-color:#FFAD33;border-bottom-color: transparent;" @click="create" :disabled="$v.todo.$anyError">Crear tarea
            </b-button>

        </b-col>
    </b-row>

    <div v-if="todos.length" class="mt-4">
        <todo v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="toggle" @remove="remove" />
    </div>

    <b-alert show variant="danger" class="mt-4" v-else>
        <h4 class="alert-heading">Todavía no has escrito nada!</h4>
        <p>
            Empieza a añadir tareas desde el formulario y verás que todas
            ellas van apareciendo justo debajo, la última la primera.
        </p>
    </b-alert>

</div>
</template>

<script>
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import FormGroup from "./FormGroup"
import {
    required,
    minLength
} from 'vuelidate/lib/validators'
import Todo from './Todo'
export default {
    name: 'TodosComponent',
    components: {
        Todo,
        FormGroup
    },
    data() {
        return {
            todo: '',
            todos: [],
            actions: {
                create: mutations.createTodo,
                list: queries.listTodos,
                update: mutations.updateTodo,
                delete: mutations.deleteTodo
            }
        }
    },
    validations: {
        todo: {
            required,
            minLength: minLength(2)
        }
    },
    mounted() {
        this.list();
    },
    methods: {
        list() {
            this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(this.actions.list), {})
                .then(res => {
                    this.todos = res.data.listTodos.items;
                    console.log(this.todos);
                    this.$notify({
                        group: 'app',
                        title: 'Success',
                        text: 'Todos listados correctamente',
                        type: 'success'
                    });
                })
                .catch(e => {
                    this.$notify({
                        group: 'app',
                        title: 'Error',
                        text: e,
                        type: 'error'
                    });

                })
        },
        create() {
            this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(this.actions.create, {
                    input: {
                        text: this.todo,
                        done: false,
                    },
                }))
                .then(res => {
                    this.list();
                    this.todo = '';
                    this.$notify({
                        group: 'app',
                        title: 'Success',
                        text: 'Tarea creada correctamente',
                        type: 'success'
                    });
                    this.$nextTick(() => this.$v.$reset())
                })
                .catch(e => {
                    this.$notify({
                        group: 'app',
                        title: 'Error',
                        text: e,
                        type: 'error'
                    });

                })
        },
        toggle(todo) {
            this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(this.actions.update, {
                    input: {
                        id: todo.id,
                        text: todo.text,
                        done: !todo.done,

                    },

                }))
                .then((res) => {
                    todo.done = !todo.done
                    this.$notify({
                        group: 'app',
                        title: 'Toggle',
                        text: `Tarea ${todo.id} actualizada`,
                        type: 'warning'
                    });
                })
                .catch((e) => {
                    this.$notify({
                        group: 'app',
                        title: 'Toggle',
                        text: `Error toggle ${todo.id}`,
                        type: 'error'
                    });
                })
        },
        remove(id) {
            this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(this.actions.delete, {
                    input: {
                        id
                    },
                }))
                .then((res) => {
                    this.$notify({
                        group: 'app',
                        title: 'Toggle',
                        text: `Tarea ${id} eliminada`,
                        type: 'success'
                    });
                    this.list();
                })
                .catch((e) => {
                    this.$notify({
                        group: 'app',
                        title: 'Toggle',
                        text: `Error eliminando tarea: ${JSON.stringify(e)}`,
                        type: 'error'
                    });
                })
        },
    }
}
</script>
