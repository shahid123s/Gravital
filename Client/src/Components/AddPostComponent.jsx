import React , {useState, useRef} from 'react'
import ProfilePic from '../assets/image.png';
import MediaButton from '../assets/media.svg';
import SheduleButton from '../assets/schedule.svg';
import PollButton from '../assets/poll.svg'

function AddPostComponent() {

    const [text, setText] = useState('');
    const textAreaRef = useRef(null);

    const handleInputChange = (e) => {
        setText(e.target.value);
    
        // Adjust height to fit content
        if (textAreaRef.current) {
          textAreaRef.current.style.height = 'auto'; // Reset height
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
      };

  return (
    <div className='bg-[#F9F9F9] rounded-lg w-[99%] flex  flex-col justify-evenly items-center  gap-10 p-5 '>
        <div className='flex w-full gap-2 '> 
        <div className='  w-14  flex items-center overflow-hidden rounded-full  '>
            <img src={ProfilePic} alt="" />
          </div>
          <div className='flex-1 flex flex-col gap-8 '>
            <textarea
              ref={textAreaRef}
              value={text}
              onChange={handleInputChange}
              rows="1"
              placeholder="Type here..."
              className=" w-full p-3 bg-[#33333333] rounded-2xl resize-none overflow-hidden disabled:"
              style={{
                minHeight: '50px',
                maxHeight: '200px',
              }}
            />

            
          </div>
        </div >
          <div className='flex w-full justify-evenly  items-start '>
              <button className='w-5 flex items-center gap-2 text-[#4A90E2] font-poppins'><img src={MediaButton} alt="" /> Media</button>
              <button className='w-5 flex items-center gap-2 text-[#4A90E2] font-poppins'><img src={PollButton} alt="" /> Poll</button>
              <button className='w-5 flex items-center gap-2 text-[#4A90E2] font-poppins'><img src={SheduleButton} alt="" /> Shedule</button>
            </div>
        </div>
  )
}

export default AddPostComponent
