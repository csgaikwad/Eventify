export default function Footer() {
  return (
    <div>
      <div className="bg-[#03346E] min-h-[3rem] flex justify-around py-2 mt-5">
        <a
          className="cursor-pointer duration-150 hover:scale-105"
          target="_blank"
          href="https://github.com/csgaikwad/eventify"
        >
          <img className="bg-white rounded-full cursor-pointer " src="/github.svg" alt="github" />
        </a>
      </div>
    </div>
  );
}
