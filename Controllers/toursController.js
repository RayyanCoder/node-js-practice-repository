const express = require('express');
const mongoose = require('mongoose');
const tourModel = require('./../models/tourModel');
const AppError = require('./../utils/appError');


exports.createTour = async(req,res)=>{
    console.log('tours is created');
        const createdTour = await tourModel.create(req.body);
    res.status(200).json({
        body:"hello world api",
        data:createdTour
    });

}

exports.updateTour = async(req,res,next)=>{
const  tour = await tourModel.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
});
if(!tour){
    next(new AppError('record not found',404));
}
res.status(200).json({
    message:'updated document successfully',
    tours:tour
});

}

exports.getTour = async(req,res,next)=>{
    const tour = await tourModel.findById(req.params.id);
    res.status(200).json({
        tours:tour
    });
}

exports.getAllTours = async(req,res,next)=>{
    const tours = await tourModel.find();
    res.status(200).json({
        allTours:tours
    });
}

exports.deleteTour = async(req,res,next)=>{
    const tour = await tourModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message:'deleted successfully',
        tour:null
    });
}
