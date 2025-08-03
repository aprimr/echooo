const NavigationRibbon = () => {
  return (
    <div className="absolute sm:flex -top-8 left-0 max-w-[446px] h-8 bg-blue-600 hidden items-center justify-center overflow-hidden z-50">
      <p className="text-white text-sm font-poppins whitespace-nowrap animate-marquee">
        This app is designed primarily for mobile devices. It works on a
        computer, but the experience may not be ideal. For the best performance
        and UI, we recommend using a mobile browser.
      </p>
    </div>
  );
};

export default NavigationRibbon;
