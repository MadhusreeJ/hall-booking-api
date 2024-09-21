const express = require("express");
const app = express();
app.listen(3000,()=>{
    console.log("Webser running");
})
app.use(express.json())

let rooms =[
    {
        room_id: 1,
        seats_available: 50,
        amenities_in_room : ["Free breakfast" , "AC room" , "Car parking"],
        price_per_hour : "Rs.500"
    },
    {
        room_id: 2,
        seats_available: 60,
        amenities_in_room : ["Free breakfast" , "AC room" , "Car parking"],
        price_per_hour : "Rs.600"
    },
    {
        room_id: 3,
        seats_available: 50,
        amenities_in_room : ["Free breakfast" , "AC room" , "Car parking"],
        price_per_hour : "Rs.530"
    },
    {
        room_id: 4,
        seats_available: 55,
        amenities_in_room : ["Free breakfast" , "AC room" , "Car parking"],
        price_per_hour : "Rs.550"
    }
]

let book_room = [
    {
        customer_id : 1,
        customer_name : "Jessy",
        date : "20-09-2024",
        start_time : "6.00 PM",
        end_time : "8.00 PM",
        room_id : 2,
        room_status : "booked",
        booking_id : 3056,
        booking_date : "15-09-2024"
    },
    {
        customer_id : 2,
        customer_name : "John",
        date : "20-09-2024",
        start_time : "6.00 PM",
        end_time : "8.00 PM",
        room_id : 3,
        room_status : "booked",
        booking_id : 3030,
        booking_date : "13-09-2024"
    },
    {
        customer_id : 3,
        customer_name : "John",
        date : "20-08-2024",
        start_time : "6.00 PM",
        end_time : "8.00 PM",
        room_id : 3,
        room_status : "booked",
        booking_id : 2088,
        booking_date : "13-08-2024"
    }

]

//create room
app.post("/createroom",(req,res)=>{
    rooms.push(req.body);
    res.json({message:"Room created successfully"});
    console.log("Room created successfully")
})

//get all rooms
app.get("/getrooms",(req,res)=>{
    res.json(rooms);
})

//book room
app.post("/bookroom/:id/:date/:time",(req,res)=>{
    let bookedRooms = book_room.find(obj => obj.room_id == req.params.id && obj.date == req.params.date && obj.start_time == req.params.time)
    if(bookedRooms){
        res.json({message:"Room already booked for the given date and time"})
    }else{
        book_room.push(req.body);
        res.json({message : "Room booked successfully"});
        console.log("Room booked successfully");
    }
})

//list of all booked rooms
app.get("/bookedrooms",(req,res)=>{
    let bookedRoomsdata =[];
    book_room.map((room)=>{
            let roomName = "room no ".concat(room.room_id);
            newData = {
                room_name: roomName,
                booked_status: "booked",
                customer_name: room.customer_name,
                date: room.date,
                start_time: room.start_time,
                end_time: room.end_time
            }
            bookedRoomsdata = [...bookedRoomsdata,newData]
           })
    res.json(bookedRoomsdata);
    console.log("Retrived successfully");
})

//list of all booked customer
app.get("/bookedcustomers",(req,res)=>{
    let bookedCustomersdata =[];
    book_room.map((room)=>{
            let roomName = "room no ".concat(room.room_id);
            newData = {
                customer_name: room.customer_name,
                room_name: roomName,
                date: room.date,
                start_time: room.start_time,
                end_time: room.end_time
            }
            bookedCustomersdata = [...bookedCustomersdata,newData]
           })
    res.json(bookedCustomersdata);
    console.log("Retrived successfully");
})

//List of how many times a customer has booked room
app.get("/customerbooking/:customername",(req,res)=>{
    let customerBookings = book_room.filter(obj => obj.customer_name == req.params.customername);
    let customerData =[];
    customerBookings.map((booking)=>{
            let roomName = "room no ".concat(booking.room_id);
            newData = {
                customer_name: booking.customer_name,
                room_name: roomName,
                date: booking.date,
                start_time: booking.start_time,
                end_time: booking.end_time,
                booking_id : booking.booking_id,
                booking_date : booking.booking_date,
                booking_status : "booked"
            }
            customerData = [...customerData,newData]
           })
    res.json(customerData);
})
