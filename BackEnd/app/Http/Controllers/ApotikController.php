<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ModelTransaksi\Pemilik;
use Illuminate\Support\Facades\DB;
use App\Traits\Valet;
use App\Http\Controllers\ApiController;
use App\ModelTransaksi\ModelTransaksi;
use App\ModelTransaksi\ObatAlkes;
use App\ModelTransaksi\TransaksiApotik;
use App\ModelTransaksi\TransaksiApotikDetail;
use phpDocumentor\Reflection\PseudoTypes\False_;
use phpDocumentor\Reflection\Types\This;



// use App\BaseModel;
class ApotikController extends ApiController
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
    public function getmaster(Request $request)
    {
        // return('x');
        // die();
        $namaobat = $request['produk'];
        $signa = $request['signa'];
        $dataLogin = $request->all();
        $datasigna = \DB::table('signa_m as s')
        ->select('s.signa_id', 's.signa_nama')
            ->where('s.signa_nama', 'like', '%' . $signa . '%')
        
        ->orderBy('s.signa_nama')
            ->take(10)
            ->get();
        $dataobat = \DB::table('obatalkes_m')
        ->select('obatalkes_id', 'obatalkes_nama', 'stok')
        ->where('obatalkes_nama','like','%'.$namaobat.'%')
            ->orderBy('obatalkes_nama')
            ->take(10)
            ->get();
       

        $result = array(
            'datasigna' => $datasigna,
            'dataproduk' => $dataobat,
            'message' => 'iqbal'
        );

        return $this->respond($result);
    }
    
    public function gettransaksi(Request $request)
    {
    //   return('x');
    //   die();
        // $namaobat = $request['produk'];
        // $signa = $request['signa'];
        // $dataLogin = $request->all();
        $dataTransaksi = \DB::table('transaksi_t as t')
       
            ->orderBy('t.tglinput','desc')
            ->take(10)
            ->get();
            foreach ($dataTransaksi as $item) {
               
                $dataTransaksidetail = \DB::table('transaksidetail_t as t')
                ->join('obatalkes_m as o', 't.idobat', '=', 'o.obatalkes_id')
                ->join('signa_m as s', 't.idsigna', '=', 's.signa_id')
                ->where('t.notransaksi','=', $item->norec)             
                ->get();
                $results[] = array(
                    'nama' => $item->namapasien,
                    'tglinput' => $item->tglinput,
                    'details' => $dataTransaksidetail,
                );
            }
           
            $result = array(
                'data' => $results,
                'message' => 'iqbal'
            );

        return $this->respond($result);
    }

    public function inserttransaksi(Request $request)
    {
        $head = $request['pasien'];
        
        $detail = $request['detail'];
        // return($detail);
        // die();
        DB::beginTransaction();
        $transStatus = 'false';
        // try {
            $dataTransaksi = new TransaksiApotik();
            $dataTransaksi->norec = $dataTransaksi->generateNewId();
            $dataTransaksi->namapasien = $head;
            $dataTransaksi->tglinput = date('Y-m-d H:i:s');
            // $dataTransaksi->tglkeluar = date('Y-m-d H:i:s');
            // $dataTransaksi->tglmasuk = date('Y-m-d H:i:s');
            $dataTransaksi->save();
            foreach ($detail as $items) {
                $dataTransaksiDetail = new TransaksiApotikDetail();
                $dataTransaksiDetail->norec = $dataTransaksiDetail->generateNewId();
                $dataTransaksiDetail->notransaksi = $dataTransaksi->norec;
                $dataTransaksiDetail->jenis = $items['jenisid'];
                $dataTransaksiDetail->idsigna = $items['signa_id'];
                $dataTransaksiDetail->idobat = $items['nama_id'];
                $dataTransaksiDetail->namaresep = $items['namaresep'];
                $dataTransaksiDetail->qty = $items['qty'];
                $dataTransaksiDetail->save();
                $dataobat = ObatAlkes::where('obatalkes_id', $items['nama_id'])
                ->first();
                // return($dataobat->stok );
                // die();
                ObatAlkes::where('obatalkes_id', $items['nama_id'])
                ->update(
                    [
                        'stok' => (float)$dataobat->stok - ((float)$items['qty'])
                    ]
                );
            }
           
                    
            $transStatus = 'true';
            $transMessage = "Simpan Transaksi";
        // } catch (\Exception $e) {
        //     $transStatus = 'false';
        //     $transMessage = "Simpan Transaksi";
        // }

        if ($transStatus != 'false') {
            DB::commit();
            $result = array(
                "status" => 201,
                "data" => $dataTransaksi,
                "message" => $transMessage,
            );
        } else {
            DB::rollBack();
            $result = array(
                "status" => 400,
                "data" => $dataTransaksi,
                "message" => $transMessage,
            );
        }

        return $this->setStatusCode($result['status'])->respond($result, $transMessage);
    }

    
}
