var express = require('express');
var app = express();
app.listen(8080);
app.get("/",function(req,res){

	res.render("index");
});

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/ParleyV");

var parser = require('body-parser');
var multer = require('multer');
var cloudinary = require('cloudinary');
var contraseña = 123;
var method_override = require('method-override');
var bson = require('bson');

cloudinary.config({
	cloud_name: "yyelda",
	api_key: "731416684523836",
	api_secret: "NB0plSdVIopasu49x2vToC_hSxg"
});



app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(multer({dest: "./uploads"}));
app.use(method_override("_method"));

app.use(express.static("public"));
//Definir el schema de nuestros productos


//base de datos, listas
var equipo = {
	title:String,
	pitcher:String,
	imageUrl:String,
};
var jugada = {
		Nombre1:String,
		image1:String,
		pitcher1:String,
		Nombre2:String,
		image2:String,
		pitcher2:String,
		descripcion:String,
		jugada:String
	};
var grupos = mongoose.model("grupos",equipo);
var jugadas = mongoose.model("jugadas",jugada);
app.set("view engine","jade");


app.get("/admin/jugada",function(sol,res){
	grupos.find(function(error,documento){
		if (error){console.log(error);}
		res.render("admin/jugada",{produc:documento})
	})
});

app.get("/contacto",function(sol,res){
	res.render("contacto/index");
});

app.get("/equipos/new",function(sol,res){
	res.render("equipos/new");
});

app.get("/equipos",function(sol,res){
	jugadas.find(function(error,documento){
		if (error){console.log(error);}
		res.render("equipos/index",{ produc:documento});
	});

});
app.post("/jugada",function(sol,res){


	var data1 = {
		Nombre1:sol.body.Nombre1,
		image1:"data.png",
		pitcher1:sol.body.pitcher1,
		Nombre2:sol.body.Nombre2,
		image2:"data.png",
		pitcher2:sol.body.pitcher2,
		descripcion:sol.body.Descripcion,
		jugada:sol.body.Jugada
	}
	var ju = new jugadas(data1);
	grupos.findOne({"title":sol.body.Nombre1},function(error,producto){
		
		ju.image1 = producto.imageUrl;
		console.log(ju.image1);
		grupos.findOne({"title":sol.body.Nombre2},function(error,producto){
		ju.image2 = producto.imageUrl;
		console.log(ju.image2);
		ju.save(function(err){
		console.log(ju);
		jugadas.find(function(error,documento){
			if (error){console.log(error);}
			res.render("equipos/index",{produc:documento})
		});
	});
	});
	});
	

	

});
process.on('uncaughtException', function (err) {
    console.log(err);
}); 
app.post("/equipos",function(sol,res){

	if (sol.body.Clave == contraseña){
			console.log(sol.body);
	var data = {
		title:sol.body.Nombre,
		pitcher:sol.body.Pitcher,
		imageUrl: "data.png"
	}
	var gru = new grupos(data);
	cloudinary.uploader.upload(sol.files.imagen.path,
		function(result){
			gru.imageUrl = result.url;
			gru.save(function(err){
			console.log(gru);
			grupos.find(function(error,documento){
			if (error){console.log(error);}
			res.render("admin/index",{ produc:documento})
		});
	});
		
	});
	}
	else{
		
		res.render("admin/index");
	}
});

app.get("/equipos/edit/:id",function(sol,res){
	var id_equi = sol.params.id;

	grupos.findOne({_id:id_equi},function(error,producto){
		console.log(producto);
		res.render("equipos/edit",{equiposw:producto});

});
});
app.get("/equipos/eliminar/:id",function(sol,res){
	var id_eq = sol.params.id;
	console.log(id_eq);
	grupos.remove({_id: id_eq}, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
	grupos.find(function(error,documento){
		if (error){console.log(error);}

		res.render("admin/index",{produc:documento});
	});
});
app.put("/equipos/:id",function(sol,res){
	if (sol.body.Clave == contraseña){
		var data = {
		title:sol.body.Nombre,
		pitcher:sol.body.pitcher
	};

	grupos.update({"_id":sol.params.id},data,function(){
		grupos.find(function(error,documento){
			if (error){console.log(error);}
			res.render("admin/index",{ produc:documento})
		});		
	})
	}
	else{
		res.redirect("/");
	}
});
app.post("/admin",function(sol,res){
	if (sol.body.Clave == contraseña){
		grupos.find(function(error,documento){
		if (error){console.log(error);}
		res.render("admin/index",{ produc:documento});
	});
	}
		else{
			res.redirect("/");
		}

});



app.get("/admin",function(sol,res){

	res.render("admin/form")

});



