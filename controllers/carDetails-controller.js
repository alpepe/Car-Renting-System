const Car = require('mongoose').model('Car')
const User = require('mongoose').model('User')
const RentedCarInfo = require('mongoose').model('RentedCarInfo')

module.exports = {
    viewDetails: (req, res) => {

        //взимаме от URL-а ид-то на избраната кола "carDetails/59e7aeec76630b07606369ac" като в routs съм му задал път "/carDetails/:id"
        let id = req.params.id
        Car.findById(id).then(foundCar => {
            res.render('carDetails', { foundCar })
        })
    },
    takeCar: (req, res) => {
        let id = req.body.carId
        let userId = req.user._id   //req.user взима логнатия user от passport
        let RentedCarInfoObj = {}   

        Car.findById(id).then(foundCar => {
            User.findById(userId).then(user => {
                user.rentedCars.push(foundCar._id)
                user.save().then(()=>{
                    foundCar.isRendet = true
                    foundCar.save().then(()=>{
                        RentedCarInfoObj={
                            car: foundCar._id,
                            user: userId,
                            date: req.body.dateOfRental,
                            days: req.body.daysOfRental
                        }

                        console.log(RentedCarInfoObj)
                        RentedCarInfo.create(RentedCarInfoObj).then(()=>{
                            res.redirect('/')
                        })
                    })
                })
            })
        })  
    }
}

