"use client"

import { CardDescription } from './cardDescription'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <>
      <div className="relative h-full min-h-0 w-full bg-[#f2f5f9]">
        {/* 浅色底图：低透明度，避免压暗正文 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('/dashboard-home-bg.png')] bg-cover bg-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-[#f2f5f9]/85 via-[#f2f7fc]/72 to-[#f2f5f9]/90"
        />
        {/* 浅色立体线段：交叉斜线网格 + 极淡水平线，替代点阵 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(28deg, transparent, transparent 17px, rgba(41,91,180,0.09) 17px, rgba(41,91,180,0.09) 18px)",
              "repeating-linear-gradient(-28deg, transparent, transparent 17px, rgba(41,91,180,0.065) 17px, rgba(41,91,180,0.065) 18px)",
              "repeating-linear-gradient(180deg, transparent, transparent 47px, rgba(15,23,42,0.035) 47px, rgba(15,23,42,0.035) 48px)",
            ].join(","),
          }}
        />
        <div className="relative z-10">
        <div 
          className='w-[136px] h-[40px] bg-[#daeaff] rounded-3xl mx-auto mt-15 flex justify-center'
        >
          <span 
            className='
            text-[#295bb4] text-[20px] flex items-center font-bold'
          >
            Workspace
          </span>
        </div>
        <h2 
          className='text-center text-[40px] text-black font-medium mt-6'
        >
          Welcome to AISupport
        </h2>
        <p className='text-[18px] text-muted-foreground w-[500px] mx-auto text-center mt-3.5 leading-[24px]'>
          AI-assisted support, conversations, knowledge, and your chat widget—centralized for your team.
        </p>
        {/* card */}
        <ul className="mx-auto flex w-full max-w-[1000px] gap-5 px-4 mt-8">
          {CardDescription.map((card) => {
            const Icon = card.icon
            return (
              <li
                key={card.title}
                className="flex flex-1 flex-col items-center rounded-lg border-2 border-[#e2e7ed] bg-white px-5 py-8 shadow-[0_0_16px_rgba(15,23,42,0.08)]  hover:border-2 hover:border-[#5779b4] hover:bg-[#eaf4fd]"
              >
                <Icon aria-hidden className="size-10 text-[#5d7db4]" />
                <p className='font-bold text-[18px] mt-2'>{card.title}</p>
                <p className='text-muted-foreground text-[16px] text-center w-[220px] mt-1.5 leading-[22px]'>{card.subTitle}</p>
              </li>
            )
          })}
        </ul>
        <div className='flex justify-center gap-4 mt-12'>
          <a 
            className='rounded-3xl bg-[#1c65e9] text-white py-3 px-5 text-[16px] hover:cursor-pointer'
            onClick={() => router.push('/conversations') }
          >
            Go to conversations
          </a>
          <a className='rounded-3xl border border-[#5f6870] py-3 px-5 text-[#5f6870] text-[16px] bg-white hover:cursor-pointer'>
            Documentation
          </a>
        </div>
        </div>
      </div>
    </>
  )
}
