import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs  } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import sweetAlert from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviues = ({id, prevReating, userRated}) => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [rating, setReating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [form, setform] = useState("");
    const [data, setData] = useState([]);
    const [newAdded, setNewAdded] = useState(0);

    const sendreview = async () => {
        setLoading(true);
        try{
            if(useAppstate.login) {

            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppstate.userName,
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()
            })  
                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                   rating: prevReating + rating,
                   rated: userRated + 1
                })

                setReating(0);
                setform("");
                setNewAdded(newAdded + 1);
                sweetAlert({
                title: "Review Sent",
                icon: "success",
                buttons: false,
                timer: 3000
              })
            }else {
                navigate('/login')
            }
        }catch (error) {
            sweetAlert({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
              })
        }
        setLoading(false)
    }
//Way
    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([])
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querySnapshort = await getDocs(quer);

            querySnapshort.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    },[newAdded])


  return (
    <div className='mt-4 border-t-2 border-pink-700 w-full'>
        <ReactStars 
            size={30}
            half={true}
            value={rating}
            onChange={(all) => setReating(all)}
              />
        <input 
        value={form}
        onChange={(e) => setform(e.target.value)}
        placeholder='Share Your thoughts....'
            className='w-full p-2 outline-none header'
        />
        <button onClick={sendreview} className='bg-green-600 flex justify-center w-full p-2'>
            {loading ? <TailSpin height={20} color={"white"}/> : 'Share'}
        </button>

        {reviewsLoading ? 
            <div className='mt-6 flex justify-center' ><ThreeDots height={10} color={"white"} /></div>
        :
        <div className='mt-5'>
            {data.map((e, i) => {
                return(
                    <div className='p-2 w-full mt-2 rounded-lg header bg-opacity-50' key={i}>
                        <div className='flex items-center'>
                        <p className='text-blue-500'>{e.name}</p>
                        <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars 
                         size={15}
                         half={true}
                         value={e.rating}
                         edit={false}
                        />
                        
                        <p>{e.thought}</p>
                    </div>
                )
            })}
        </div>
        }
    </div>   
  )
}

export default Reviues;