import React from 'react'
import { FloatingHearts } from './FloatingHearts'
import { ConfettiButton } from './ConfettiButton'
import fal from "./assets/fal.png"



const Bday = () => {
    return (
        <div className='bg-[#004030] text-[#FEFAE0]'>
            <FloatingHearts />
            <div className=' font-curly min-h-screen flex flex-col items-center justify-center'>
                <div className='text-center flex flex-col items-center justify-center'>
                    <h1 className='text-[76px] font-bold font-curly '>Happy Birthday Falashree!</h1>
                    <p className='text-3xl font-bold font-curly2 tracking-[4px] mb-10'>Wishing you a day filled with love, joy, and wonderful surprises!</p>
                    <ConfettiButton>Click for Surprise!</ConfettiButton>
                </div>
            </div>
            <div className='w-full h-fit flex justify-center items-center'>
                <img src={fal} />
            </div>
            <div className='bg-[#FEFAE0] w-full h-[640px] text-[#004030] flex justify-center items-center text-center '>
                <div className='w-[1000px] text-lg font-semibold font-curly3'>
                    <div className='text-[48px] font-extrabold font-curly2'>A Letter from the Brother You Found in College</div>
                    I don’t know how to put this in perfect words, but I’ll try anyway—because<br/> you deserve to hear it.
                    <br /><br />
                    We weren’t born as siblings, but somewhere between college deadlines, random talks, silent understandings, and being there for each other without asking—something just clicked. You became that one person I never knew I needed, but now I can’t imagine my life without.
                    <br /><br />
                    There’s a kind of comfort in our bond that feels rare. You’ve been there—not just in the good moments, but especially in the ones where I couldn’t say much but still wanted someone to understand. And you did. Without trying too hard, you’ve made a space in my life that feels like family.
                    <br /><br />
                    You're not my sister by blood, but the heart knows better. And mine knows you're family.
                    <br /><br />
                    On your special day, I just want to say thank you—for being you. For being a sister. For staying.
                    <br /><br />
                    Happy birthday, Falashree. I’m proud to call you my sister.
                    <br /><br />
                    Thanks for being in my life!
                    – Avishkar
                </div>
            </div>
            <div className='w-full h-[600px]'>

            </div>
       

        </div>

    )
}

export default Bday
