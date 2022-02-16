<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ModelTransaksi\Pemilik;
use Illuminate\Support\Facades\DB;
use App\Traits\Valet;
use App\Http\Controllers\ApiController;
use phpDocumentor\Reflection\PseudoTypes\False_;
use phpDocumentor\Reflection\Types\This;
use Illuminate\Support\Facades\Hash;

use Lcobucci\JWT\Signer\Hmac\Sha512;
use Lcobucci\JWT\Builder;

// use App\BaseModel;
class LoginController extends ApiController
{
    use Valet;
    // use BaseModel;
  
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //  $this->setStatusCode()
        return 204;
        //
    }
    public function createToken($user)
    {
        $class = new Builder();
        $signer = new Sha512();
        $token = $class->setHeader('alg', 'HS512')
        ->set('sub', $user)
            ->sign($signer, "Dhealth")
            ->getToken();
        return $token;
    }
    public function loginUser(Request $request)
    {
        /*
         * composer update --no-plugins --no-scripts
         * composer require lcobucci/jwt
         * sumber -> https://github.com/lcobucci/jwt
         */
  
        $login = DB::table('login_s')
        // ->where('user', '=', $this->encryptSHA1($request->input('kataSandi')))
        ->where('password', '=',$request->input('password'))
        ->where('user', '=', $request->input('user'));
        $LoginUser = $login->get();
       
        if (count($LoginUser) > 0) {
        

            $dataLogin = array(
                'user' => $LoginUser[0]->user
               
            );
            // $token['X-AUTH-TOKEN'] = $this->createToken($LoginUser[0]->user) . '';

            $result = array(
                'data' => $dataLogin,
                // 'messages' => $token,
                'status' => 201,
                'as' => '#Iqbal'
            );

            //endregion
        } else {
            //region Login Gagal send 400 code
            $result = array(
                'data' => [],
                'messages' => 'Login gagal, Username atau Password salah',
                'status' => 400,
                'as' => '#Iqbal'
            );
            //endregion
        }

        return $this->setStatusCode($result['status'])->respond($result);
    }

    
}
