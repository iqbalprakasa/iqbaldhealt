<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ModelTransaksi\Pemilik;
use Illuminate\Support\Facades\DB;
use App\Traits\Valet;
use App\Http\Controllers\ApiController;
use phpDocumentor\Reflection\PseudoTypes\False_;
use phpDocumentor\Reflection\Types\This;


// use App\BaseModel;
class PemilikController extends ApiController
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function isian(Request $request)
    {
        
        DB::beginTransaction();
        // $transStatus = 'true';
        try {        
            
            $dataPemilik = new Pemilik();
            $dataPemilik->norec = $dataPemilik->generateNewId();
            // return ($dataPemilik->norec);
            // die();   
            $dataPemilik->nama = $request['nama'];
            $dataPemilik->alamat = $request['alamat'];           
            // $dataPemilik->tglkeluar = date('Y-m-d H:i:s');
            // $dataPemilik->tglmasuk = date('Y-m-d H:i:s');
            $dataPemilik->save();
            // return ( $dataPemilik);        
            $transStatus = 'true';
            $transMessage = "simpan AntrianPasienDiperiksa";
        } catch (\Exception $e) {
            $transStatus = 'false';
            $transMessage = "simpan AntrianPasienDiperiksa";
        }

        if ($transStatus != 'false') {
            DB::commit();
            $result = array(
                "status" => 201,
                "data" => $dataPemilik,
                "message" => $transMessage,
            );
        } else {
            DB::rollBack();
            $result = array(
                "status" => 400,
                "data" => $dataPemilik,
                "message" => $transMessage,
            );
        }

        return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
