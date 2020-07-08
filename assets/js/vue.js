
var application = new Vue({
    el: '#app',
    components:{
        user,
        CreateUserModal,
        DeleteUserModal
    },
    data: function(){
        return {
            model:{
                name:'',
                email:'',
                address:'',
                phone:'',
            },
            users:[],
            user:null,
            userId:null,
            error:false,
            success:false,
            message:''
        }
    },
    methods:{
        fetchAll: async function() {
            await axios.post("/", window.convertToFormData({action: 'fetchAllUsers'}))
            .then((response) => {
                this.users = response.data;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        openEditModal:  function(user){
            this.user = user;
            setTimeout(()=>{
                $("#editEmployeeModal").modal("show");
            },0)
        },
        openDeleteModal: function (userId) {
            this.userId = userId;
            $("#deleteEmployeeModal").modal("show");
        },
        createUser: async function (user){
            var data = user;
            data.action = 'createUser';
            await axios.post("/", window.convertToFormData(data))
                .then((response) => {
                    this.users.push(user);
                    this.message = response.data.message;
                    this.success = true;
                    this.error = false
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.success = false;
                    this.error = true;
                })
            $("#addEmployeeModal").modal('hide');
        },
        editUser: async function (){
            var data = this.user;
            data.action = 'updateUser';
            var newUser = this.user;
            await axios.post("/", window.convertToFormData(data))
                .then((response) => {
                    let index = this.users.findIndex(function (user) {
                        return user.id === newUser.id
                    })
                    this.users[index] = newUser;
                    this.message = response.data.message;
                    this.success = true;
                    this.error = false
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.success = false;
                    this.error = true;
                })
            $("#editEmployeeModal").modal("hide");
        },
        deleteUser: async function (e){
            var data = {userId:this.userId,action:'deleteUser'}
            var self = this;
            var userId = this.userId;
            await axios.post("/", window.convertToFormData(data))
                .then((response) => {
                    self.users = self.users.filter(function (user) {
                        return user.id !== userId
                    });
                    this.message = response.data.message;
                    this.success = true;
                    this.error = false
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                    this.success = false;
                    this.error = true;
                })
            $("#deleteEmployeeModal").modal("hide");
        }

    },
    created:function(){
        this.fetchAll()
    }

})
