const http = require('http');
const express = require('express')
const request = require('request')
const bodyParser= require('body-parser');
const { json } = require('body-parser');
const { response } = require('express');
const xl = require('excel4node');
const app = express()


const workbook = new xl.Workbook();
const worksheet = workbook.addWorksheet('Inventory Items');
const headings = [
    "Quantity",
    "Price",
    "Name",
    "InventoryId",
    "Description"
]

var inventory_arr;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

//Route to Homepage
app.get('/',function(req,res){
    inventory_url = "https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory";
    request({url: inventory_url,json:true},(error,response)=>{
        if(error){
            console.log("Error fetching Data");
            return;
        }
        data_string = JSON.stringify(response.body)
        data = JSON.parse(data_string)
        inventory_arr = data.Items
        res.render('index.ejs', {items:inventory_arr})
    })
})

//Route to call PUT method to the API to Insert/Update Inventory into Table
app.post('/enterDetails',function(req,res){
    inventoryName = req.body.name
    inventoryId = req.body.id 
    inventoryPrice = Number(req.body.price)
    inventoryQuantity = Number(req.body.quantity)
    inventoryDesc = req.body.desc
    request.put({
        url: "https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory",
        json: true,
        body:{
            "id": inventoryId,
            "name": inventoryName,
            "price": inventoryPrice,
            "desc": inventoryDesc,
            "quantity": inventoryQuantity
        }
    }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }

        console.log(`Status: ${response.statusCode}`);
        console.log(body);
        res.redirect('/');
    });

})

//Route to open Form page to Create Inventory Data
app.get('/form',function(res,res){
    res.sendFile(__dirname+'/form.html')
})

//Route to open Update Form Page to Select Inventory ID to update
app.get('/form-update',function(res,res){
    inventory_url = "https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory";
    request({url: inventory_url,json:true},(error,response)=>{
        if(error){
            console.log("Error fetching Data");
            return;
        }
        data_string = JSON.stringify(response.body)
        data = JSON.parse(data_string)
        inventory_arr = data.Items
        res.render('form_update.ejs', {items:inventory_arr})
    })
})

//Route to Update Form to Update the Fields for the Inventory Selected
app.get('/update-id',function(req,res){
    request({
        url:"https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory/"+req.query.id,
        json:true
        },
        (error,response)=>{
        if(error){
            console.log("Error fetching Data");
            return;
        }
        data_string = JSON.stringify(response.body)
        data = JSON.parse(data_string)
        inventory = data.Item
        res.render('form_update_id.ejs', {item:inventory})
    })
})

//Route to Delete Form Page to Delete the Inventory
app.get('/form-delete',function(res,res){
    inventory_url = "https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory";
    request({url: inventory_url,json:true},(error,response)=>{
        if(error){
            console.log("Error fetching Data");
            return;
        }
        data_string = JSON.stringify(response.body)
        data = JSON.parse(data_string)
        inventory_arr = data.Items
        res.render('form_delete.ejs', {items:inventory_arr})
    })
})

//Route to call Delete API to delete the Inventory
app.get('/delete',function(req,res){
    request.delete({
        url:"https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory/"+req.query.id,
    },(err, response, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Status: ${response.statusCode}`);
        console.log(body);
        res.redirect('/');
    });
    console.log(req.query)
})

//Route to Export Data to Excel Workbook
app.get('/export', function(req,res){

    inventory_url = "https://m51seo6ep2.execute-api.us-east-1.amazonaws.com/inventory";
    request({url: inventory_url,json:true},(error,response)=>{
        if(error){
            console.log("Error fetching Data");
            return;
        }
        data_string = JSON.stringify(response.body)
        data = JSON.parse(data_string)
        data_arr = data.Items

        let index = 1;
        headings.forEach(heading => {
        worksheet.cell(1, index++)
            .string(heading)
        });

        index = 2;
        data_arr.forEach( record => {
        let columnIndex = 1;
        Object.keys(record ).forEach(columnName =>{
            worksheet.cell(index,columnIndex++)
                .string(String(record [columnName]))
        });
        index++;
        }); 

        workbook.write('InventoryData.xlsx',res)
//        res.sendFile(__dirname + '/InventoryData.xlsx')
        
        
        console.log("Wrote to excel");
    })
})

//Server listening on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is up on port ${PORT}');
    console.log('Press Ctrl+C to QUIT')
})

module.exports = app;

