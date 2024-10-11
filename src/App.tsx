import React, { useState } from 'react';
import { Users, DollarSign, Calendar, Mail, Sparkles, CheckCircle, PhoneCall, Camera } from 'lucide-react';

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex items-start space-x-4 p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-purple-400 flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold mb-2 text-purple-300">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Set up the HubSpot submission
    const portalId = '47682807';  // Your HubSpot portal ID
    const formId = '65f4de5d-bc82-4c8e-b339-d1fd0f54cf40';  // Your HubSpot form ID

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
    const data = {
      fields: [{ name: "email", value: email }],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitMessage("Thanks for signing up! 🎉 You’re one step closer to your next legendary night out. Keep an eye on your inbox—we’ll be in touch soon with some exciting details!");
        setEmail('');
      } else {
        setSubmitMessage('Oops! There was a problem. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Oops! There was a problem. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 font-display">Your Crew's Complete Night Out Solution!</h1>
          <p className="text-2xl mb-10 max-w-2xl mx-auto font-light">Effortless Planning, Exciting Experiences, and Memorable Moments Await!</p>
          <a href="#signup" className="btn btn-primary text-lg px-8 py-3">Join the VIP List</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 font-display text-purple-300">Your Group's Night, Perfected</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature 
              icon={<Sparkles size={32} />}
              title="Group-Tailored Experiences"
              description="Discover the perfect lineup that caters to everyone's vibe and preferences."
            />
            <Feature 
              icon={<Users size={32} />}
              title="Effortless Group Coordination"
              description="Manage RSVPs and keep your crew in sync without the endless group chat messages."
            />
            <Feature 
              icon={<Calendar size={32} />}
              title="Seamless Group Bookings"
              description="We handle reservations for your entire group, so you can focus on the fun, not the logistics."
            />
            <Feature 
              icon={<Mail size={32} />}
              title="Smart Group Notifications"
              description="Keep everyone in the loop with timely reminders and your full night's itinerary."
            />
            <Feature 
              icon={<PhoneCall size={32} />}
              title="Real-Time Group Support"
              description="Get assistance for unexpected changes, ensuring your whole group stays on track."
            />
            <Feature 
              icon={<Camera size={32} />}
              title="Shared Memories"
              description="Easily collect and share the night's best moments with your entire group."
            />
            <Feature 
              icon={<CheckCircle size={32} />}
              title="Group Night Navigator"
              description="Everyone knows what's next on your epic group night out adventure."
            />
            <Feature 
              icon={<DollarSign size={32} />}
              title="Fair Group Expense Splitting"
              description="Split bills easily and fairly, eliminating post-night-out money awkwardness."
            />
          </div>
        </div>
      </section>

      {/* Email Sign-Up Section */}
      <section id="signup" className="bg-gradient-to-r from-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-display">Be a Group Night Out Pioneer</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Get exclusive early access and be the first to revolutionize your group nights out. The future of partying with friends starts with you!</p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 text-lg"
              />
              <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get VIP Access'}
              </button>
            </div>
          </form>
          {submitMessage && (
            <p className="mt-6 text-lg font-semibold bg-purple-800 p-4 rounded-lg inline-block">{submitMessage}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold italic mb-4">Say goodbye to group chat chaos, split bills drama, and indecision paralysis!</p>
          <p>&copy; 2024 OutDone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
