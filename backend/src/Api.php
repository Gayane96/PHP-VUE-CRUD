<?php


class Api
{

    /**
     * Api constructor.
     */
    public function __construct()
    {
        $this->checkPermission();
        $this->userTable = new DB('users');
        if( array_key_exists('action',$_REQUEST) ){
            if( method_exists($this,$_REQUEST['action']) ){
                call_user_func([$this,$_REQUEST['action']]);
            }
            $this->response(['message' => 'Method Not Found'],'HTTP/1.1 404 Not Found',404);
        }
        $this->response(['message' => 'action required'],'HTTP/1.1 401 Unauthorized',400);
    }

    public function updateUser()
    {
        $this->userTable->where('id',"=",$_REQUEST['id'])
            ->update(
            [
                'name'=>$_REQUEST['name'] ?? '',
                'email'=>$_REQUEST['email'] ?? '',
                'address' => $_REQUEST['address'] ?? "",
                'phone' => $_REQUEST['phone'],
                'updated' => date('Y-m-d H:i:s')
            ]
        );
        if( $this->userTable->error() ){
            $this->response(['message' => $this->userTable->error()],"HTTP/1.1 403 Forbidden",403);
        }
        $this->response(['message'=>"User Successfully updated"]);
    }

    public function createUser()
    {
        $this->userTable->insert(
            [
                'name'=>$_REQUEST['name'] ?? '',
                'email'=>$_REQUEST['email'] ?? '',
                'address' => $_REQUEST['address'] ?? "",
                'phone' => $_REQUEST['phone'],
                'isDeleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'updated' => date('Y-m-d H:i:s')
            ]
        );
        if( $this->userTable->error() ){
            $this->response(['message' => $this->userTable->error()],"HTTP/1.1 403 Forbidden",403);
        }
        $this->response(['message' => 'User Successfully added']);
    }

    public function deleteUser()
    {
        $this->userTable->where('id',"=",$_REQUEST['userId'])
            ->update(
                [
                    'isDeleted' => 1,
                    'updated' => date('Y-m-d H:i:s')
                ]
            );
        if( $this->userTable->error() ){
            $this->response(['message' => $this->userTable->error()],"HTTP/1.1 403 Forbidden",403);
        }
        $this->response(['message'=>"User Successfully deleted"]);
    }

    public function fetchAllUsers()
    {
        $users = DB::table('users')
            ->select()
            ->where('isDeleted',"!=",1)
            ->all();
        $this->response($users);
    }

    /**
     *
     */
    public function checkPermission()
    {
        $headers = getallheaders();
        if( !array_key_exists('Authorization',$headers) || $headers['Authorization'] != AUTHORIZATION ){
            $this->response(['message' => 'Unauthorized'],'HTTP/1.1 401 Unauthorized',200);
        }
    }

    /**
     * @param $data
     * @param $header
     * @param $code
     */
    public function response($data, $header = 'HTTP/1.1 200 OK', $code = 200 )
    {
        header($header, true, $code);
        echo json_encode($data);
        exit();
    }
}
