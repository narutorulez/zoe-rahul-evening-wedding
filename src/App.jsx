import { useMemo, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock3,
  BedDouble,
  Mail,
  Heart,
  Gift,
  UtensilsCrossed,
} from "lucide-react";
import mandalaBg from "./assets/mandala_mirrored_full_zoomed_out_with_final_dots.png";
import westonHallImg from "./assets/weston-hall.jpg";

function InviteMandala() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#fcfbf8]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={mandalaBg}
          alt=""
          className="w-[110vw] max-w-[1400px] object-contain opacity-[0.50]"
          style={{ transform: "translateY(3vh)" }}
        />
      </div>
    </div>
  );
}

export default function ZoeRahulWeddingWebsite() {
  const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbzMKamEjEja_ac3b5zUcXhgkW7zv4MdS6--ij1ZVCnOdqkQunI2ra8LB87H4xOIH_rt/exec";

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  attendance: "",
  foodChoice: "",
  message: "",
});
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

const isFormComplete =
  formData.name.trim() &&
  formData.email.trim() &&
  formData.attendance.trim() &&
  formData.foodChoice.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitState("error");
      setSubmitMessage(
        "Please enter your name and email before sending your RSVP.",
      );
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");

    const payload = {
      SubmittedAt: new Date().toISOString(),
  Name: formData.name,
  Email: formData.email,
  Attendance: formData.attendance,
  FoodChoice: formData.foodChoice,
  Message: formData.message,
    };

    try {
      const body = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        body.append(key, String(value || ""));
      });

      const response = await fetch(RSVP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to save RSVP");
      }

      setSubmitState("success");
      setSubmitMessage("Thank you. Your RSVP has been sent successfully.");
      setFormData({
  name: "",
  email: "",
  attendance: "",
  foodChoice: "",
  message: "",
});
    } catch (error) {
  console.error(error);
  setSubmitState("error");
  setSubmitMessage(
    error?.message || "Something went wrong while sending your RSVP. Please try again."
  );
}
  };

  const events = useMemo(
    () => [
      {
        time: "2:30pm",
        title: "Guest arrivals",
        text: "Please arrive from 2:30pm so everyone is comfortably seated before the ceremony begins.",
        icon: Clock3,
      },
      {
        time: "3:30pm",
        title: "Ceremony",
        text: "Our wedding ceremony begins at 3:30pm.",
        icon: Heart,
      },
      {
        time: "After ceremony",
        title: "Celebrations",
        text: "Drinks, dinner, and dancing to follow at Weston Hall.",
        icon: UtensilsCrossed,
      },
    ],
    [],
  );

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-transparent text-stone-700">
      <InviteMandala />

      <style>{`
        html { scroll-behavior: smooth; }
        body { background: #fcfbf8; }

        .gold-text {
          background: linear-gradient(180deg, #f4d791 0%, #d8ac58 10%, #9b6d29 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .gold-line {
          background: linear-gradient(90deg, rgba(244,215,145,0), rgba(201,153,70,.95), rgba(244,215,145,0));
        }

        .section-card {
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(184, 146, 74, 0.18);
          box-shadow: 0 14px 40px rgba(145, 113, 57, 0.08);
        }

        .content-layer {
          position: relative;
          z-index: 1;
        }

        .invite-shell {
          position: relative;
        }

        .invite-shell::before {
  content: "";
  position: absolute;
  top: 0px;
  right: 16px;
  bottom: 16px;
  left: 16px;
  border: 4px solid rgba(183, 138, 53, 0.88);
  pointer-events: none;
}

.invite-shell::after {
  content: "";
  position: absolute;
  top: 11px;
  right: 27px;
  bottom: 27px;
  left: 27px;
  border: 2.7px solid rgba(214, 170, 91, 0.65);
  pointer-events: none;
}

        .invite-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.48), rgba(255,255,255,0.72));
          pointer-events: none;
        }

        .hero-title {
  font-size: clamp(3.6rem, 8vw, 6.8rem);
  line-height: 1.12;
  padding-top: 0.08em;
}

        .formal-copy {
          font-size: clamp(1.15rem, 2.2vw, 1.55rem);
          line-height: 1.8;
          color: #6f604c;
          font-style: italic;
        }

        .small-formal {
          font-size: clamp(1.1rem, 1.8vw, 1.35rem);
          line-height: 1.8;
          color: #7b6750;
          font-style: italic;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-[#dbc089]/20 bg-[#fcfbf8]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12">
  <div className="majority-font text-4xl leading-none tracking-wide text-[#9d6f2c]">
    Zoë & Rahul
  </div>
          <nav className="hidden gap-6 text-1xl text-stone-600 md:flex">
            <a href="#story" className="hover:text-[#9d6f2c]">
              Our Day
            </a>
            <a href="#schedule" className="hover:text-[#9d6f2c]">
              Schedule
            </a>
            <a href="#venue" className="hover:text-[#9d6f2c]">
              Venue
            </a>
            <a href="#stay" className="hover:text-[#9d6f2c]">
              Stay
            </a>
            <a href="#rsvp" className="hover:text-[#9d6f2c]">
              RSVP
            </a>
          </nav>
        </div>
      </header>

      <section className="invite-shell relative min-h-screen overflow-hidden">
        <div className="invite-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,248,230,0.42),transparent_36%)]" />

        <div className="content-layer mx-auto flex min-h-screen max-w-5xl flex-col px-8 pb-28 pt-16 sm:px-12 lg:px-16">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="small-formal mb-5">Together with their families</p>
            <h1 className="gold-text hero-title hero-names mb0">
  Zoë & Rahul
</h1>
            <p className="formal-copy max-w-3xl">
              invite you to join them as they celebrate their wedding day.
            </p>

            <div className="mt-12 flex items-center gap-5 sm:gap-7">
              <div className="gold-line h-[4px] w-16 sm:w-24" />
              <div className="font-serif text-3xl uppercase tracking-[0.08em] text-[#8d6327] sm:text-4xl">
                8th August 2026
              </div>
              <div className="gold-line h-[4px] w-16 sm:w-24" />
            </div>

            <p className="small-formal mt-10 max-w-3xl">
              Arrivals from 2:30pm&nbsp;&nbsp;|&nbsp;&nbsp;Ceremony at 3:30pm
            </p>

            <div className="mt-10">
              <div className="font-serif text-3xl uppercase tracking-[0.06em] text-[#8d6327] sm:text-[2.3rem]">
                Weston Hall
              </div>
              <p className="small-formal mt-2 max-w-2xl">
                1810 Weston Bank, Stafford ST18 0HS
              </p>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href="#rsvp"
                className="rounded-full border-2 border-[#c89b4c] bg-white/85 px-7 py-3 text-sm uppercase tracking-[0.25em] text-[#9d6f2c] transition hover:bg-[#fff7e8]"
              >
                RSVP
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="content-layer mx-auto max-w-6xl space-y-8 px-6 pb-20 pt-8 sm:px-10 lg:px-16">
        <section id="story" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="section-card rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
              Welcome
            </p>
            <h2 className="gold-text mt-3 font-serif text-3xl sm:text-4xl">
              We are so happy you are here
            </h2>
            <p className="mt-6 text-base leading-8 text-stone-600 sm:text-lg">
              We are so excited to celebrate this special day with the people we
              love most. Thank you for being part of our story, and for joining
              us as we begin this next chapter together.
            </p>
            <p className="mt-4 text-base leading-8 text-stone-600 sm:text-lg">
              This website includes the key details for the day, including
              timings, venue information, travel notes, accommodation guidance,
              and RSVP details.
            </p>
            <div className="mt-4 flex items-start gap-3 text-stone-600">
  <Gift className="mt-6 h-7 w-7 shrink-0 text-[#b28a45]" />
  <p className="text-base leading-8 sm:text-lg">
    Your presence at our wedding is the greatest gift of all. However, if you would like to give a gift, we would be truly grateful for a contribution towards our honeymoon.
  </p>
</div>
          </div>

          <div className="section-card rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
              At a glance
            </p>
            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-4">
                <CalendarDays className="mt-1 h-5 w-5 text-[#b28a45]" />
                <div>
                  <div className="font-medium">Saturday, 8th August 2026</div>
                  <div className="text-stone-600">
                    Save the date for our wedding celebration.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-[#b28a45]" />
                <div>
                  <div className="font-medium">Weston Hall</div>
                  <div className="text-stone-600">
                    1810 Weston Bank, Stafford ST18 0HS
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock3 className="mt-1 h-5 w-5 text-[#b28a45]" />
                <div>
                  <div className="font-medium">Intinerary</div>
<div className="mt0 space-y-1.2 text-stone-600">
  {[
    "2:30pm - Arrivals",
    "3:30pm - Ceremony begins",
    "4:30pm - Cake cutting",
    "5pm - Dinner expected to be served",
    "6pm - Evening celebrations begin",
    "9pm - Evening food served",
    "12pm - Carriages",
  ].map((item) => (
    <div key={item} className="flex items-start gap-3">
      <span className="mt-[0.65rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#c89b4c]" />
      <span>{item}</span>
    </div>
  ))}
</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="schedule" className="section-card rounded-[2rem] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
            Schedule
          </p>
          <h2 className="gold-text mt-3 font-serif text-3xl sm:text-4xl">
            The day
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {events.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-[#d7b775]/30 bg-[#fffdfa]/88 p-6"
                >
                  <Icon className="h-6 w-6 text-[#b28a45]" />
                  <div className="mt-4 text-sm uppercase tracking-[0.25em] text-[#b28a45]">
                    {item.time}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-stone-700">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-stone-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="venue" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="section-card rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
              Venue
            </p>
            <h2 className="gold-text mt-3 font-serif text-3xl sm:text-4xl">
              Weston Hall
            </h2>
            <p className="mt-6 leading-8 text-stone-600">
              1810 Weston Bank
              <br />
              Stafford ST18 0HS
            </p>
            <p className="mt-5 leading-8 text-stone-600">
              Set in the Staffordshire countryside, Weston Hall will host our
              ceremony and celebrations. More venue-specific guidance can be
              added here, including arrival instructions and where different
              parts of the day will take place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Weston+Hall+1810+Weston+Bank+Stafford+ST18+0HS"
                className="rounded-full border border-[#c89b4c] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[#9d6f2c] hover:bg-[#fff7e8]"
              >
                Open map
              </a>
            </div>
          </div>

          <div className="section-card rounded-[2rem] p-8 sm:p-10">
  <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#c89b4c]">
    <img
      src={westonHallImg}
      alt="Weston Hall wedding venue"
      className="h-full min-h-[320px] w-full object-cover object-center"
    />
  </div>
</div>
        </section>

        <section id="stay" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
  <div className="section-card rounded-[2rem] p-8 sm:p-10">
    <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
      Accommodation
    </p>
    <h2 className="gold-text mt-3 font-serif text-3xl sm:text-4xl">
      Where to stay
    </h2>

    <p className="mt-6 leading-8 text-stone-600">
      We’ve listed a few nearby options for guests who would like to stay locally:
    </p>

    <div className="mt-6 space-y-4 text-center">
      {[
        "The Saracen’s Head",
        "The Dog & Doublet",
        "The Swan Hotel",
        "Premier Inn Stafford",
      ].map((place) => (
        <div
          key={place}
          className="mx-auto flex w-fit items-center justify-center gap-3 border-b border-[#d7b775]/20 pb-3 text-stone-600"
    >
          <span className="h-2 w-2 rounded-full bg-[#c89b4c]" />
          <span className="font-semibold leading-8">{place}</span>
        </div>
      ))}
    </div>
  </div>

  <div className="grid gap-5 sm:grid-cols-2">
    <div className="section-card rounded-[2rem] p-7">
  <BedDouble className="h-6 w-6 text-[#b28a45]" />
  <h3 className="mt-4 font-serif text-2xl">The Saracen’s Head</h3>
  <p className="mt-3 leading-7 text-stone-600">
    Located in Weston, approximately a 3 minute drive from Weston Hall.
  </p>
  <p className="mt-3 leading-7 text-stone-600">
    <a
      href="https://www.saracensheadweston.co.uk/"
      target="_blank"
      rel="noreferrer"
      className="inline-block hover:text-[#9d6f2c]"
    >
      <span className="font-semibold text-stone-700">The Saracen’s Head</span>
      <br />
      <span className="underline decoration-[#c89b4c]/60 underline-offset-4">
        Stafford Rd, Weston, Stafford ST18 0HT
      </span>
    </a>
    <br />
    Tel: 01889 270286
  </p>
</div>

    <div className="section-card rounded-[2rem] p-7">
  <BedDouble className="h-6 w-6 text-[#b28a45]" />
  <h3 className="mt-4 font-serif text-2xl">Other nearby options</h3>

  <div className="mt-3 space-y-4 text-stone-600">
    <div className="leading-7">
      <a
        href="https://www.doganddoubletsandon.co.uk/"
        target="_blank"
        rel="noreferrer"
        className="inline-block hover:text-[#9d6f2c]"
      >
        <span className="font-semibold text-stone-700">The Dog & Doublet</span>
        <br />
        <span className="underline decoration-[#c89b4c]/60 underline-offset-4">
          Sandon Rd, Sandon, Stafford ST18 0DJ
        </span>
      </a>
    </div>

    <div className="leading-7">
      <a
        href="https://theswanstafford.co.uk/"
        target="_blank"
        rel="noreferrer"
        className="inline-block hover:text-[#9d6f2c]"
      >
        <span className="font-semibold text-stone-700">The Swan Hotel</span>
        <br />
        <span className="underline decoration-[#c89b4c]/60 underline-offset-4">
          46A Greengate St, Stafford ST16 2JA
        </span>
      </a>
    </div>

    <div className="leading-7">
      <a
        href="https://www.premierinn.com/gb/en/hotels/england/staffordshire/stafford/stafford-north-hurricane.html"
        target="_blank"
        rel="noreferrer"
        className="inline-block hover:text-[#9d6f2c]"
      >
        <span className="font-semibold text-stone-700">Premier Inn Stafford</span>
        <br />
        <span className="underline decoration-[#c89b4c]/60 underline-offset-4">
          The Shire Horse, 1 Hurricane Cl, Stafford ST16 1GZ
        </span>
      </a>
    </div>
  </div>
</div>
  </div>
</section>

        <section className="hidden grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="section-card rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
              Photos
            </p>
            <h2 className="gold-text mt-3 font-serif text-3xl sm:text-4xl">
              Moments we love
            </h2>
            <p className="mt-6 leading-8 text-stone-600">
              A gallery section can be added here with engagement photos,
              pre-wedding images, or a simple slideshow.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="aspect-square rounded-[1.25rem] border border-[#d8bb7f]/30 bg-gradient-to-br from-[#fffaf0]/90 to-[#f8f0de]/90"
                />
              ))}
            </div>
          </div>

          <div className="section-card rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
              Gift message
            </p>
            <h2 className="gold-text mt-3 font-serif text-3xl sm:text-4xl">
              A note on gifts
            </h2>
            <p className="mt-6 leading-8 text-stone-600">
              Gift wording is still to be confirmed and can be added here later.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-[#d7b775]/30 bg-[#fffdfa]/88 p-6 text-stone-600">
              Gift wording to follow.
            </div>
          </div>
        </section>

        <section id="rsvp" className="section-card rounded-[2rem] p-8 sm:p-10">
  <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
    <div>
  <p className="text-xs uppercase tracking-[0.35em] text-[#b28a45]">
    RSVP
  </p>
  <h2 className="gold-text mt-3 font-serif text-3xl sm:text-4xl">
    Kindly respond
  </h2>

  <div className="mt-8 rounded-[1.5rem] border border-[#d7b775]/28 bg-[#fffdfa]/88 p-5 text-stone-600">
    <p className="text-center text-lg font-medium leading-7 text-stone-700">
  Please let us know whether you’ll be able to join us as we celebrate our wedding day.
</p>

<div className="gold-line mx-auto mt-2.5 h-px w-80" />

<div className="mt-2.5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="mt-[0.6rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#c89b4c]" />
        <p className="leading-7">Please submit a response for each guest attending.</p>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-[0.6rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#c89b4c]" />
        <p className="leading-7">
          Guests may choose between a <span className="font-semibold text-stone-700">Standard</span> or{" "}
          <span className="font-semibold text-stone-700">Vegetarian</span> menu.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-[0.6rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#c89b4c]" />
        <p className="leading-7">
          Please use the message box to share any dietary requirements or anything else we should know.
        </p>
      </div>
    </div>
  </div>

  <div className="mt-8 rounded-[1.5rem] border border-[#d7b775]/28 bg-[#fffdfa]/88 p-5 text-stone-600">
  <p className="gold-text text-center font-serif font-semibold">Menu options</p>

  <div className="mt-4 grid gap-4 sm:grid-cols-2">
    <div className="rounded-[1.25rem] border border-[#d7b775]/20 bg-white/70 p-4 text-center">
      <p className="font-semibold text-stone-700">Standard Menu</p>

      <div className="mt-4 space-y-3 leading-7 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#b28a45]">Starter</p>
          <p>Chicken Caesar Salad</p>
        </div>

        <div>
  <p className="text-xs uppercase tracking-[0.18em] text-[#b28a45]">Main</p>
  <p>Farmhouse Chicken</p>
</div>

<div className="h-4" />

<div>
  <p className="text-xs uppercase tracking-[0.18em] text-[#b28a45]">Dessert</p>
  <p>Eton Mess</p>
</div>
      </div>
    </div>

    <div className="rounded-[1.25rem] border border-[#d7b775]/20 bg-white/70 p-4 text-center">
      <p className="font-semibold text-stone-700">Vegetarian Menu</p>

      <div className="mt-4 space-y-3 leading-7 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#b28a45]">Starter</p>
          <p>Goats Cheese Salad</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#b28a45]">Main</p>
          <p>Butternut Squash &amp; Spinach Risotto</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#b28a45]">Dessert</p>
          <p>Eton Mess</p>
        </div>
      </div>
    </div>
    </div>
</div>

</div>

<div className="flex flex-col items-center">
  <h2 className="gold-text mt-6 mb-6 text-center font-serif text-3xl sm:text-4xl">
  RSVP Form
</h2>


  <form
    onSubmit={handleSubmit}
    className="w-full max-w-[560px] rounded-[2rem] border border-[#d7b775]/30 bg-gradient-to-b from-[#fffaf0]/92 to-white/92 p-6 sm:p-8"
  >

  <div className="grid gap-4">
                <div>
          <label className="mb-2 block text-sm text-stone-600">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#ddc28f]/45 bg-white px-4 py-3 outline-none"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-stone-600">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#ddc28f]/45 bg-white px-4 py-3 outline-none"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
  <label className="mb-2 block text-sm text-stone-600">
    Attendance
  </label>
  <select
    name="attendance"
    value={formData.attendance}
    onChange={handleChange}
    className="w-full rounded-2xl border border-[#ddc28f]/45 bg-white px-4 py-3 outline-none"
    required
  >
    <option value="">Please select</option>
    <option value="Yes, I / we will attend">Yes, I / we will attend</option>
    <option value="No, I / we cannot attend">No, I / we cannot attend</option>
  </select>
</div>

        <div>
          <label className="mb-2 block text-sm text-stone-600">
            Menu choice
          </label>
          <select
            name="foodChoice"
            value={formData.foodChoice}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#ddc28f]/45 bg-white px-4 py-3 outline-none"
          >
            <option value="">Please select</option>
            <option value="Standard Menu">Standard Menu</option>
            <option value="Vegetarian Menu">Vegetarian Menu</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-stone-600">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="min-h-[120px] w-full rounded-2xl border border-[#ddc28f]/45 bg-white px-4 py-3 outline-none"
            placeholder="Leave a note (optional)"
          />
        </div>

        {submitMessage && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              submitState === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : submitState === "error"
                  ? "border border-red-200 bg-red-50 text-red-700"
                  : "border border-[#ddc28f]/45 bg-white text-stone-600"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <button
  type="submit"
  disabled={submitState === "submitting" || !isFormComplete}
  className="mt-2 rounded-full border border-[#c89b4c] bg-white px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#9d6f2c] hover:bg-[#fff7e8] disabled:cursor-not-allowed disabled:opacity-60"
>
  {submitState === "submitting" ? "Sending..." : "Send RSVP"}
</button>
      </div>
    </form>
  </div>
</div>
</section>
      </main>

      <footer className="content-layer border-t border-[#dbc089]/20 px-6 py-10 text-center sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="majority-font text-2xl text-[#9d6f2c]">Zoë & Rahul</div>
          <p className="mt-3 text-stone-600">
            8th August 2026 · Weston Hall · Stafford
          </p>
          <div className="gold-line mx-auto mt-5 h-px w-24" />
        </div>
      </footer>
    </div>
  );
}
