import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";

export const postJob = catchAsyncErrors(async(req,res,next)=>{
    const {
    title, 
    jobType, 
    location, 
    companyName, 
    qualifications, 
    introduction, 
    responsibilities,
    offers, salary, 
    hiringMultipleCandidates, 
    personalWebsiteTitle, 
    personalWebsiteUrl,
    jobNiche, 
    newsLetterSent } = req.body;

    if(
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !qualifications ||
    !introduction ||
    !responsibilities ||
    !offers ||
    !salary ||
    !jobNiche
    ){
        return next(new ErrorHandler("Please provide full job details.",400));
    }
    if((personalWebsiteTitle && !personalWebsiteUrl) ||(!personalWebsiteTitle && personalWebsiteUrl)){
        return next(
            new ErrorHandler(
                "Provide both the website url and title, or leave both blank.",
                400
            )
        );
    }
    const postedBy = req.user._id; 
    const job = await Job.create({
    title, 
    jobType, 
    location, 
    companyName, 
    qualifications, 
    introduction, 
    responsibilities,
    offers, salary, 
    hiringMultipleCandidates, 
    personalWebsite:{
        title:personalWebsiteTitle,
        url:personalWebsiteUrl
    }, 
    jobNiche, 
    postedBy
    })
    res.status(201).json({
        success:true,
        message:"Job posted successfully.",
        job
    })
})