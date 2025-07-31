const NavigationRibbon = () => {
  return (
    <div className="absolute sm:flex -top-8 left-0 w-screen h-8 bg-blue-600 hidden items-center justify-center overflow-hidden z-50">
      <p className="text-white text-sm font-poppins whitespace-nowrap animate-marquee">
        This web app is designed for mobile devices. While you can view it on
        desktop, some features may not work properly. For the best experience,
        please use a mobile phone.
      </p>
    </div>
  );
};

export default NavigationRibbon;
