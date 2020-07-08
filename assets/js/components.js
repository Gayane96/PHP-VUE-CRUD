
const user = Vue.extend({
    props:{
        user:{
            type:Object,
            required:true
        }
    },
    template: `
        <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address }} </td>
            <td>{{ user.phone }}</td>
            <td>
                <a href="javascript:void(0)" class="edit" @click="$emit('open_edit_modal',user);">
                    <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                </a>
                <a href="javascript:void(0)" class="delete" @click="$emit('open_delete_modal',user.id);">
                    <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                </a>
            </td>
        </tr>
    `
})

// create Modal Component
const CreateUserModal = Vue.extend({
    props:{
        model:{
            type: Object,
            required: true
        }
    },
    template: `
            <div id="addEmployeeModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Add User</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="model.name" required >
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" v-model="model.email" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <textarea class="form-control" v-model="model.address" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" v-model="model.phone" class="form-control" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-success" value="Add" @click="$emit('create_user',model)">
                        </div>
                    </div>
                </div>
            </div>
    `
})

// create Modal Component
const DeleteUserModal = Vue.extend({
    template: `
        <div id="deleteEmployeeModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Delete Employee</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete these Records?</p>
                            <p class="text-warning"><small>This action cannot be undone.</small></p>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-danger" value="Delete" @click="$emit('delete_user',true)">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
})
