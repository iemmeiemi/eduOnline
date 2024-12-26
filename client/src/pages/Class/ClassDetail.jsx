import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import ClassInfoBanner from "./Component/ClassInfoBanner";
import ClassInstance, { ClassInstanceView } from "./Component/ClassInstance";

const ClassDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [classInstance, setClassInstance] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [isOwner, setIsOwner] = useState(0);

  const request = useAxios();

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await request("GET", `/api/class/${id}`);
        setClassDetail(response.data.data.cl);
        setClassInstance(response.data.data.cl.instances);
        setInstructor(response.data.data.cl.instructor);
        setIsOwner(response.data.data.isOwner);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClassDetail();
  }, [id]);

  if (!classDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-stretch items-center gap-8 py-20 home-container">
      <ClassInfoBanner
        classDetail={classDetail}
        isOwner={isOwner}
        instructor={instructor}
      />
      <div className="divider"></div>
      <div className="flex flex-col sm:flex-row justify-stretch items-center gap-8 w-full mt-5"> 
        <div className="flex flex-col justify-center items-center w-full">
          {isOwner ? (
            <ClassInstance classInstance={classInstance} />
          ) : (
            <ClassInstanceView classInstance={classInstance} classDetail={classDetail} />
          )}
        </div>
        <div className="w-2/5 flex flex-col justify-center items-center">Comment Section</div>
      </div>
      <div className="divider"></div>
      <div>Class Recommendation</div>
    </div>
  );
};

export default ClassDetail;