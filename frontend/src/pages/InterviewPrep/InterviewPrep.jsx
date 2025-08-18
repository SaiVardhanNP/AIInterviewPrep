import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import {AnimatePresence,motion} from 'framer-motion';
import { LuCircleAlert,LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/loader/SpinnerLoader';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/cards/QuestionCard';
import AIResponsePreview from './AIResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/loader/SkeletonLoader';

const InterviewPrep = () => {
  const {sessionId}=useParams();
  const [sessionData,setSessionData]=useState(null);
  const [errorMsg,setErrorMsg]=useState("");

  const [openLeanMoreDrawer,setOpenLeanMoreDrawer]=useState(false);
  const [explanation,setExplanation]=useState(null);

  const [isLoading,setIsLoading]=useState(false);
  const [isUpdateLoader,setIsUpdateLoader]=useState(null);

  const fetchSessionDetailsById=async()=>{
    try{
      const response=await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      // console.log(response);
      if(response.data && response.data.session){
        setSessionData(response.data.session);
      }
    }
    catch(error){
      console.error("Error",error);
    }
  };

  // console.log(sessionData);

  const generateConceptExplanation=async(question)=>{
    try{
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response=await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );
      if(response.data){
        setExplanation(response.data);
      }
    }
    catch(error){
      setExplanation(null);
      setError("Failed to generate explanation. Try again later!");
      console.error("Error",error);
    }
    finally{
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus=async(questionId)=>{
    try{
      const response=await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      console.log(response);

      if(response.data && response.data.question){
        fetchSessionDetailsById();
      }
    }
    catch(error){
      console.error("Error",error);
    }
  };

  const uploadMoreQuestions=async()=>{};

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }
    return ()=>{};
  },[]);
  return (
    <DashboardLayout>
      <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFocus={sessionData?.topicsToFocus || ""}
      experience={sessionData?.experience || "-"}
      questions={sessionData?.questions?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdated={
        sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY")
        :""
      }
      />
      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg font-semibold color-black'>Interview Q&A</h2>
        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7":"md:col-span-8"}`}>
            <AnimatePresence>
              {
                sessionData?.questions?.map((data,index)=>{
                  return (
                    <motion.div key={data._id || index} initial={{opacity:0, y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.95}} transition={{duration:0.4,type:'spring',stiffness:100,delay:index*0.1, damping:15}}
                    layout
                    layoutId={`question-${data._id} || index`}
                    >
                      <>
                      <QuestionCard question={data?.question} answer={data?.answer} onLearnMore={()=>generateConceptExplanation(data.question)} isPinned={data?.isPinned} onTogglePin={()=>toggleQuestionPinStatus(data._id)}/>
                      </>
                    </motion.div>
                  )
                })
              }
            </AnimatePresence>

          </div>
        </div>
      </div>
      <Drawer 
      isOpen={openLeanMoreDrawer}
      onClose={()=>setOpenLeanMoreDrawer(false)}
      title={!isLoading && explanation?.title}
      >
        {
          errorMsg && (
            <p className='flex gap-2 text-sm text-amber-600 font-medium'>
              <LuCircleAlert className='mt-1'/>{errorMsg}
            </p>
          )
        }
        {
          isLoading && <SkeletonLoader/>
        }
        {
          !isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation}/>
          )
        }
      </Drawer>
    </DashboardLayout>
  )
}

export default InterviewPrep
