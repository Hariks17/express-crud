const express=require('express');
const router=express.Router();
const members=require('../../Members')
const uuid=require('uuid')


//Get single member
router.get('/',(req,res)=>{
    res.json(members)
  })


 //Get All member 
router.get('/:id',(req,res)=>{
    const found=members.some(member => member.id === parseInt(req.params.id))
    if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else{
      res.status(400).json({message:'Member not found'})
    }
  }) 

  //Create Member
  router.post('/',(req,res)=>{
    const newMember={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({
            message:"Please include a name and email"})
    }   
    members.push(newMember);
    res.redirect('/');
  });
  //Update
  router.put('/:id',(req,res)=>{
    const found=members.some(member => member.id === parseInt(req.params.id))
    if(found){
        const updMember=req.body;
        members.forEach((member)=>{
        if(member.id=== parseInt(req.params.id))
            {
            member.name=updMember.name?updMember.name:member.name;
            member.email=updMember.email?updMember.email:member.email;
            res.json({message:"Member was updates ",member})
            }
        })
    }
    else{
      res.status(400).json({message:'Member not found'})
    }
  }) 
  //Delete
  router.delete('/:id',(req,res)=>{
    const found=members.some(member => member.id === parseInt(req.params.id))
    if(found){
    res.json(members.filter(member => member.id !== parseInt(req.params.id)))
    return res.json(members)
    }
    else{
      res.status(400).json({message:'Member not found'})
    }
  }) 
  module.exports=router;