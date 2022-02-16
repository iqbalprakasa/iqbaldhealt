import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppService } from '../../servicesdb/service.service';
import { SelectItem } from 'primeng/api';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';

@Component({
    templateUrl: './daftarmaster.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class daftarmasterComponent implements OnInit {

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products:any;

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];
    selectedDrop: SelectItem;
    x: any;
    password: string;
    jenis: SelectItem[];
    produk: SelectItem[];
    listsigna: SelectItem[];
    dataproduk: any;
    rekapPasienDirawat: any;
    user : String;
    listRuangan: any[] = []
    rowsPerPageOptions = [5, 10, 20];
    arr:any = []
    namapasien:string;
    namaresep:string;
    produks:any=[];
    stok:number;
    qty:number;
    signas:any=[];
    expandedRows = {};
    isExpanded: boolean = false;
    constructor(private productService: ProductService, private messageService: MessageService,
                private confirmationService: ConfirmationService,public appservice: AppService) {}

     expandAll() {
        if(!this.isExpanded){
          this.products.forEach(product => this.expandedRows[product.name] = true);

        } else {
          this.expandedRows={};
        }
        this.isExpanded = !this.isExpanded;
    }
                
    filterCountry(event){
        this.appservice.getTransaksi('getmaster?produk='+event.query).subscribe(data => {
        let datas:any = data
        this.produk = datas.dataproduk;        
       
        // // this.produk= this.dataproduk.dataproduk;
        // this.dataproduk.forEach(element => {
        //     this.produk.push(element)
        // });
        })
        
    }
    ganti(event){
        debugger;
        let datas:any = this.produks
        this.stok = parseInt(datas.stok); 
    }
    signa(event){
        debugger;
        this.appservice.getTransaksi('getmaster?signa='+event.query).subscribe(data => {
        let datas:any = data
        this.listsigna = datas.datasigna;
        // // this.produk= this.dataproduk.dataproduk;
        // this.dataproduk.forEach(element => {
        //     this.produk.push(element)
        // });
        })
        
    }
    // jenisr(event){
    //     this.appservice.getTransaksi('getmaster?produk='+event.query).subscribe(data => {
    //     let datas:any = data
    //     this.listsigna = datas.datasigna;
    //     // // this.produk= this.dataproduk.dataproduk;
    //     // this.dataproduk.forEach(element => {
    //     //     this.produk.push(element)
    //     // });
    //     })
        
    // }
    ngOnInit() {
//   this.productService.getProductsWithOrdersSmall().then(
//       data => this.products = data;
//       debugger;);
        this.appservice.getTransaksi('gettransaksi').subscribe(data => {
          let datas:any = data
            this.products = datas.data
            debugger;
        })
        this.jenis = [
            {label: 'Racikan', value: {id: 1, name: 'Racikan', code: '1'}},
            {label: 'Non Racikan', value: {id: 2, name: 'Non Raciakn', code: '2'}},
        ];

    
        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }
    
    tambah() {
        let status = true;
        this.submitted = true;
        if(this.produks.obatalkes_nama == undefined) {
            alert("Produk Belum Diisi!!")
            status = false;
            return;
        }
        if (this.selectedDrop == undefined){
            alert("Jenis Belum Diisi!!")
            status = false;
            return;
        }
         if (this.qty == undefined){
            alert("Qty Belum Diisi!!")
            status = false;
            return;
        }
        if (this.stok < this.qty ){
                this.messageService.add({severity: 'info', summary: 'Peringatan', detail: 'Stok Kurang', life: 3000});
                status = false;
                return;
        }
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].nama_id ==  this.produks.obatalkes_id) {
                // index = i;
                this.messageService.add({severity: 'info', summary: 'Peringatan', detail: 'Obat sudah di tambahkan', life: 3000});
                // break;
                return;
            }
        }
        if(status == true){            
            var datatransaksi = {
            nama_id: this.produks.obatalkes_id,
            jenisid: this.selectedDrop.value.id,
            jenis: this.selectedDrop.value.name,
            namaproduk: '[ '+this.selectedDrop.value.name+'] '+this.produks.obatalkes_nama,
            qty: this.qty,
            signa_id: this.signas.signa_id,
            signa_nama: this.signas.signa_nama,
            namaresep :this.namaresep
            };
            this.arr.push(datatransaksi);
            this.products = this.arr;
            this.clear();            
            this.submitted = false;
        }
    }
    // simpanfix(){
        
    // }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.nama_id !== this.product.nama_id);
        this.arr= this.arr.filter(val => val.nama_id !== this.product.nama_id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }
     simpan() {
          var obj = {
        'name': this.product.name
      }
      this.appservice.posteuy(obj).subscribe(data => {
        //   debugger;
           
        })
    }
    
    savetransaksi(){
        debugger;
      var obj = {
        'pasien': this.namapasien,
        'detail': this.arr
      }
      this.appservice.postTransaksi('posttransaksi',obj).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Sukses', detail: 'Data tersimpan' });
             this.clear();
             this.namaresep="";
             this.namapasien="";
             this.arr="";
             this.products = this.arr;
    })
    }
   
    clear(){
        this.produks="";
        this.qty=0;
        this.signas="";
        this.stok=0;
        // this.selectedDrop ;
            // jenis: this.selectedDrop.value.name,
            // namaproduk: '[ '+this.selectedDrop.value.name+'] '+this.produks.obatalkes_nama,
            // qty: this.qty,
            // signa_id: this.signas.signa_id,
            // signa_nama: this.signas.signa_nama,
            // namaresep :this.namaresep
    }
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
