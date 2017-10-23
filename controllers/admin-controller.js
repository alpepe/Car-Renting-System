const Car = require('mongoose').model('Car')


module.exports = {
    addCarGet: (req, res) => {
        res.render('admin/addCar');
    },
    addCarPost:(req, res)=>{
        
        let newCar ={
            model: req.body.model,
            image: req.body.image,
            price: req.body.price,
            year: req.body.year,
            creationDate: Date.now()
        }

        Car.create(newCar).then((obj)=>{
            console.log(obj)
            res.redirect('/')
        })
    }
}