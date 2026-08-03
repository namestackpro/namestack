const Logo = () => {
  return (
    <div className="p-3 flex flex-row text-foreground font-bold text-xl gap-[.6rem] justify-center items-center">
      <div className="rotate-[-45deg] ">
        <div className="h-10 w-10 bg-[#D183C9] flex items-center justify-center rounded-full">
          <div className="h-6 w-6  bg-[#FFEBF0] rounded-r-4xl border-5 border-[#19183B]"></div>
        </div>
      </div>
      <span className="text-foreground flex flex-row justify-center items-end text-2xl">
        Namestack
      </span>
    </div>
  )
}
export default Logo
