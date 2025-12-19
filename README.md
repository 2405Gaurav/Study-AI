# 🎙️ Voicademy: Your 24/7 AI Private Tutor

<div align="center">

**Transforming Traditional Study into an Intelligent, Voice-First Adaptive Experience**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Vapi](https://img.shields.io/badge/Voice_AI-Vapi-FF5733?style=for-the-badge&logo=microphone&logoColor=white)](https://vapi.ai/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

</div>

---

## 🚀 The Vision

Voicademy is not just another study app—it is an **AI-powered personal learning assistant**. Designed to replicate the intimacy and effectiveness of a private tutor, it leverages voice-interactive sessions and real-time intelligence to help students study smarter, retain more, and learn faster.

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Core Capabilities](#-core-capabilities)
- [Tech Stack](#️-tech-stack)
- [Architectural Highlights](#️-architectural-highlights)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Project Overview

Voicademy transforms the traditional, passive study workflow into an **intelligent, adaptive experience**. By integrating cutting-edge Voice AI with Large Language Models, the platform understands student needs, explains complex concepts in real-time, and generates personalized study materials on the fly.

---

## 🧠 Core Capabilities

### 🗣️ Voice-Interactive Sessions
Powered by **Vapi**, Voicademy allows students to have natural, low-latency conversations with their AI tutor. Ask questions out loud, get immediate verbal explanations, and practice active recall through dialogue.

### 📝 Dynamic Note Generation
As you learn, the AI automatically synthesizes conversations and study materials into high-quality, structured notes. No more manual transcription—focus on the concept, while the AI handles the documentation.

### 📈 Personalized Recommendations
The system tracks your learning progress and tailors study paths. It identifies knowledge gaps and suggests specific topics or resources to master next, ensuring a truly custom learning curve.

---

## 🛠️ Tech Stack

| Component | Technology | Role |
|-----------|------------|------|
| **Framework** | **Next.js 15 (App Router)** | High-performance React infrastructure |
| **Voice Engine** | **Vapi** | Low-latency real-time Voice AI orchestration |
| **Authentication** | **Clerk** | Secure, seamless user identity management |
| **Database** | **Supabase** | Scalable PostgreSQL storage & real-time data |
| **Styling** | **Tailwind CSS** | Modern, responsive neobrutalist UI design |
| **Language** | **TypeScript** | Robust, type-safe development |
| **AI/ML** | **LLM Integration** | Brain behind concept explanations & notes |

---

## 🏗️ Architectural Highlights

- **Real-time Interaction:** Leveraging WebSockets and Vapi for zero-lag verbal communication
- **State Management:** Intelligent syncing between voice sessions and the persistent database (Supabase)
- **Edge Ready:** Optimized for fast global delivery using Next.js edge runtime and Vercel
- **Secure by Design:** Strict middleware-level authentication using Clerk to protect student data

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Clerk account for authentication
- A Supabase project
- A Vapi account for voice AI

### 1. Clone the repository

```bash
git clone https://github.com/2405Gaurav/Study-AI
cd Study-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
VAPI_PUBLIC_KEY=your_vapi_public_key
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running.

---

## 📁 Project Structure

```
📂 voicademy
├── 📂 app                 # Next.js App Router (Pages & API)
├── 📂 components          # Voice components & UI primitives
├── 📂 hooks               # Custom Vapi & Audio hooks
├── 📂 lib                 # Supabase & Clerk configurations
├── 📂 public              # Static assets & cover images
├── 📂 types               # TypeScript interface definitions
└── 📄 tailwind.config.ts  # Neobrutalist theme configuration
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/2405Gaurav/Study-AI/issues).

---

## 📝 License

This project is [MIT](LICENSE) licensed.

---

<div align="center">

### 🎓 Study Smarter, Not Harder

Developed by [Gaurav](https://github.com/2405Gaurav)

[Live Demo](https://voicademy.thegauravthakur.in/) • [Report Bug](https://github.com/2405Gaurav/Study-AI/issues) • [GitHub](https://github.com/2405Gaurav/Study-AI)

</div>
