import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Header from '../utils/Header';
import { useRef, useState } from 'react';
import { MdContactMail } from 'react-icons/md';


const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const sendEmail = e => {
    e.preventDefault();

    // Set the hidden time field to current time before sending
    formRef.current.querySelector('input[name="time"]').value =
      new Date().toLocaleString();

    setLoading(true);
    emailjs
      .sendForm(
        'service_e8mkrqf', // service ID
        'template_klpboni', // template ID
        formRef.current,
        'ngLjHaSK8D7NvI6kl' // public key
      )
      .then(
        result => {
          console.log(result.text);
          toast.success('Message sent successfully! 🎉');
          setForm({ name: '', email: '', message: '' });
          setLoading(false);
        },
        error => {
          console.error(error.text);
          toast.error('Failed to send message. Please try again later.');
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact" className="c-space mb-10 xs:my-20 group">
      <div className="container">
        <Header headerText={'Get In Contact'} />
        <article className="relative flex flex-col items-center justify-center">
          <img
            src={`${import.meta.env.BASE_URL}assets/terminal.webp`}
            alt="terminalIMG"
            loading='lazy'
            className="xs:block absolute inset-0 hidden h-235 w-full sm:h-240"
          />
          <div className="contact-container">
            <h3 className="head-text cool_shadow xs:mt-14 flex items-center gap-2 brightness-200">
              <MdContactMail className="mt-0.5 text-white" /> Lets talk!
            </h3>
            <p className="text-white-600 mt-3 text-lg">
              Whether you're looking to build a new website, improve your
              existing platform, or bring a unique project to life, im here to
              help!
            </p>
            <form
              onSubmit={sendEmail}
              ref={formRef}
              className="mt-12 flex flex-col space-y-7"
            >
              <input type="hidden" name="time" />

              <label htmlFor="name" className="flex flex-col gap-1">
                <span className="field-label">Full name</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="field-input"
                  placeholder="John Doe"
                />
              </label>
              <label htmlFor="email" className="flex flex-col gap-1">
                <span className="field-label">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="field-input"
                  placeholder="JohnDoe@gmail.com"
                />
              </label>
              <label htmlFor="message" className="flex flex-col gap-1">
                <span className="field-label">Your message</span>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  minLength={10}
                  className="field-input h-65 resize-none"
                  placeholder="Hi, i wanna give you a job.."
                />
              </label>
              <button
                type="submit"
                className="btn w-full"
                disabled={loading}
                aria-label="send message"
              >
                <span className="relative flex h-3 w-3">
                  <span
                    className={`ping ${loading ? 'bg-red-500' : 'bg-[#22c55e]'}`}
                  />
                  <span
                    className={`ping_dot ${loading ? 'bg-red-500' : 'bg-[#22c55e]'}`}
                  />{' '}
                </span>
                {loading ? 'Sending...' : 'Send message!'}
              </button>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Contact;
