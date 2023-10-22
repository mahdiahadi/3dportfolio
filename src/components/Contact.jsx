import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
const Contact = () => {
  const formRef = useRef();
  const [form,setForm] = useState({
    name: "",
    email:"",
    message:""
  });
  const handleChange = (e) =>{
    const {target} = e;
    const { name, value} = target;

    setForm({
      ...form,
      [name]: value,
    });
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_2iqtt1x',
      'template_uchjzz6',
      {
        from_name: form.name,
        to_name: 'mehdi ahadi',
        from_email: form.email,
        to_email: "mehdi.reactjs@gmail.com",
        message: form.message,
      },
      'uWm48xhFRkk3QtFG1'
    ).then(
      () => {
        setLoading(false);
        alert('Email Sent! I will get back to you as soon as possible.');

        setForm({
          name:'',
          email:'',
          message:'',
        })
      },(error) => {
        setLoading(true);
        console.log("Failed to send email", error);
        alert("Ahh, something went wrong. Please try again.");
      }
    )

  }
  const [loading, setLoading] = useState(false)
  return (
    <div className=" xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left","tween",0.2,1)}
        className='flex-[0.75] bg-slate-800 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Content.</h3>
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input 
              type="text" name="name" value={form.name} onChange={handleChange} 
              placeholder="What's your good name?"
              className=' bg-slate-700 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input 
              type="text" name="email" value={form.email} onChange={handleChange} 
              placeholder="What's your web address?"
              className=' bg-slate-700 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your message</span>
            <textarea 
              rows={7} name="message" value={form.message} onChange={handleChange} 
              placeholder='What you want to say?'
              className=' bg-slate-700 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
          />
          </label>
          <button
           type='submit'
           className=' bg-slate-800 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
         >
            {loading ? 'sending...' : 'send'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,'contact')