# Cadence

> **Stop Planning. Start Executing.**

Cadence is an intelligent, AI-powered planner designed to help you turn complex projects into simple, actionable steps. Break through procrastination with AI-driven workflows and build lasting habits with zero friction.

## ✨ Key Features

- **🧠 AI Task Breakdown:** Automatically dissects massive projects into bite-sized, achievable micro-tasks so you never feel overwhelmed again.
- **📈 Habit Intelligence:** Learns your peak performance hours over time and automatically suggests scheduling high-focus tasks when you're most alert.
- **🔔 Contextual Nudges:** Smart notifications that gently guide you to act precisely at the right moment, avoiding meaningless calendar clutter.
- **🔐 Secure Authentication:** Powered by Supabase for a seamless and secure login experience.
- **📊 Analytics Dashboard:** Track your productivity and habit streaks with interactive charts.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend:** React 19, [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Calendar Elements:** React Big Calendar, React Day Picker
- **AI Integration:** Google Generative AI

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cadence
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your required credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Add any other required environment variables (e.g., AI provider keys)
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
