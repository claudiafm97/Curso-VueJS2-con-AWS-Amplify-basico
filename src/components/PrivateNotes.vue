<template>
<div class="mt-4">
    <h2 class="text-center">Notas privadas</h2>

    <form-group :validator="$v.private_note.note" label="Nota">
        <template slot-scope="{ attrs, listeners }">
            <b-form-input v-model="private_note.note" v-bind="attrs" v-on="listeners"></b-form-input>
        </template>
    </form-group>

    <b-button class="btn-block" style="margin-top: 32px;background-color:#FFAD33;border-bottom-color: transparent;" @click="createPrivateNote" :disabled="$v.private_note.$anyError || ! $v.private_note.$dirty">Crear nueva nota privada
    </b-button>

    <div v-if="privateNotes.length" class="mt-4">
        <private-note v-for="private_note in privateNotes" :key="private_note.id" :private_note="private_note" @remove="deletePrivateNote" />
    </div>

    <b-alert show variant="danger" class="mt-4" v-else>
        <h4 class="alert-heading">Todavía no has escrito nada!</h4>
        <p>
            Empieza a añadir notas desde el formulario y verás que todas
            ellas van apareciendo justo debajo, la última la primera.
        </p>
    </b-alert>
</div>
</template>

<script>
import {
    createPrivateNote,
    deletePrivateNote
} from "../graphql/mutations"
import {
    listPrivateNotes
} from "../graphql/queries"
import FormGroup from "./FormGroup"
import {
    required,
    minLength
} from 'vuelidate/lib/validators'
import PrivateNote from './PrivateNote'
export default {
    components: {
        PrivateNote,
        FormGroup
    },
    data() {
        return {
            private_note: {
                note: '',
            },
            privateNotes: [],
            actions: {
                create: createPrivateNote,
                list: listPrivateNotes,
                delete: deletePrivateNote,
            },
        }
    },
    validations: {
        private_note: {
            note: {
                required,
                minLength: minLength(2)
            },
        }
    },
    mounted() {
        this.list();
    },
    methods: {
        async list() {
            try {
                const res = await this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(this.actions.list, {}))
                this.privateNotes = res.data.listPrivateNotes.items;
                this.$notify({
                    group: 'app',
                    title: 'Success',
                    text: 'Notas privadas listadas correctamente',
                    type: 'success'
                });
            } catch (e) {
                this.$notify({
                    group: 'app',
                    title: 'Error',
                    text: e,
                    type: 'error',
                    timeout: 20000
                });
            }
        },
        async createPrivateNote() {
            try {
                await this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(this.actions.create, {
                    input: {
                        note: this.private_note.note,

                    },

                }))
                await this.list();
                this.private_note.note = '';
                this.$nextTick(() => {
                    this.$v.$reset()
                })
            } catch (e) {
                this.$notify({
                    group: 'app',
                    title: 'Error creando nota privada',
                    text: e,
                    type: 'danger'
                });
            }
        },
        async deletePrivateNote(privateNoteId) {
            try {
                await this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(this.actions.delete, {
                    input: {
                        id: privateNoteId
                    }
                }))
                this.$notify({
                    group: 'app',
                    title: 'Success',
                    text: 'Nota privada eliminada correctamente',
                    type: 'success'
                });
                this.list();
            } catch (e) {
                this.$notify({
                    group: 'app',
                    title: 'Error eliminando la nota privada',
                    text: e,
                    type: 'danger'
                });
            }
        }
    }
}
</script>
