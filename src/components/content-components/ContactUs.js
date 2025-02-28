import { Container } from "react-bootstrap";

const ContactUs = () => {
  return (
    <>
      <Container>
        <div className="flex items-center gap-0">
          <div className="circle flex items-center text-2xl font-bold">
            <span className="Con">Con</span>
          </div>
          <div className="text-2xl font-bold">tact Us</div>
        </div>

        <div className="line-v flex items-center"></div>

        <div className="flex items-start gap-4">
  {/* Wrapper untuk ikon */}
  <div className="line-r rounded-full">
    <i className="pt-2 pl-3 fa-sharp fa-solid fa-map mt-4"></i>
    <i className="pt-8 pl-3 fa-solid fa-phone-volume"></i>
    <i className="pt-3 pl-3 fa-solid fa-envelope"></i>
    <i className="pt-3 pl-3 fa-brands fa-facebook"></i>
    <i className="pt-3 pl-3 fa-brands fa-instagram"></i>
    <i className="pt-3 pl-3 fa-brands fa-x-twitter"></i>
    <i className="pt-3 pl-3 fa-brands fa-tiktok"></i>
  </div>

  {/* Wrapper untuk teks */}
  <div className="text-container flex flex-col space-y-3">
    <span className="max-w-[420px]">
      Universitas Sumatera Utara, Jl. Universitas No.9, Padang Bulan, Kec. Medan Baru, Kota Medan, Sumatera Utara 20155
    </span>
    <span className="max-w-[400px]">+628123456789</span>
    <span className="max-w-[400px]">fimpa@fimpa.co</span>
    <span className="max-w-[400px]">Fimpa</span>
    <span className="max-w-[400px]">@fimpa</span>
    <span className="max-w-[400px]">fimpa</span>
    <span className="max-w-[400px]">fimpa</span>
  </div>
</div>

      </Container>
    </>
  );
};

export default ContactUs;
