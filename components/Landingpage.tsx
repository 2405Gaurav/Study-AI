"use client"
import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, GraduationCap, ArrowRight, Users, Target, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';

const LandingPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDemoClick = () => {
    // You can redirect to a demo page or handle demo functionality
    router.push('/dashboard'); // Change this to your demo route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" style={{margin: 0, padding: 0, border: 'none', outline: 'none'}}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">LearnAI Pro</span>
          </div>
          
          {/* Header Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
        <div className="text-center mb-20">
          <h1 className={`text-5xl md:text-7xl font-bold text-gray-800 mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Interactive Learning
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Elevate your skills with our sophisticated AI-driven learning platform. 
            Designed for professionals who demand excellence in their educational journey.
          </p>
        </div>

        {/* Enhanced Book Animation */}
        <div className={`flex justify-center mb-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="relative">
            <div className="relative w-96 h-96 flex items-center justify-center">
              {/* Main Book Stack */}
              <div className="relative">
                {/* Book 1 - Back */}
                <div className="absolute w-56 h-72 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg shadow-xl transform rotate-6 translate-x-4 translate-y-2">
                  <div className="absolute inset-4 bg-orange-200/20 backdrop-blur rounded"></div>
                </div>
                
                {/* Book 2 - Middle */}
                <div className="absolute w-56 h-72 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg shadow-xl transform rotate-3 translate-x-2 translate-y-1">
                  <div className="absolute inset-4 bg-amber-200/20 backdrop-blur rounded"></div>
                </div>
                
                {/* Book 3 - Front */}
                <div className="relative w-56 h-72 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-4 bg-yellow-200/20 backdrop-blur rounded"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <BookOpen className="w-20 h-20 text-white mb-4" />
                    <div className="text-center">
                      <div className="w-16 h-1 bg-white/60 rounded mx-auto mb-2"></div>
                      <div className="w-12 h-1 bg-white/40 rounded mx-auto mb-2"></div>
                      <div className="w-14 h-1 bg-white/40 rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Professional Icons */}
              <div className="absolute -top-12 -left-16 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-8 -right-20 w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-12 -right-16 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-700">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 -left-20 w-14 h-14 bg-gradient-to-r from-orange-600 to-amber-700 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`max-w-lg mx-auto mb-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Ready to Transform Your Learning?
            </h2>
            
            {/* Signed In User - Show Dashboard Button */}
            <SignedIn>
              <Button 
                onClick={() => router.push('/dashboard')} // Change to your dashboard route
                className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 group text-lg shadow-lg border-0 outline-none" 
                style={{border: 'none', outline: 'none'}}
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SignedIn>

            {/* Signed Out User - Show Sign Up Button */}
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 group text-lg shadow-lg border-0 outline-none" style={{border: 'none', outline: 'none'}}>
                  <span>Get Started - Sign Up Free</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </SignUpButton>
            </SignedOut>

            {/* Demo Button - Available for everyone */}
            <button 
              onClick={handleDemoClick}
              className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-gray-800 font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 group text-lg shadow-lg border-0 outline-none" 
              style={{border: 'none', outline: 'none'}}
            >
              <span>Try Demo</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform text-orange-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Professional Feature Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0" style={{border: 'none', outline: 'none'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Driven Insights</h3>
            <p className="text-gray-600 leading-relaxed">Advanced algorithms analyze your learning patterns to provide personalized recommendations and optimize your educational journey.</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50/80 to-yellow-50/80 backdrop-blur rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0" style={{border: 'none', outline: 'none'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Precision Learning</h3>
            <p className="text-gray-600 leading-relaxed">Targeted skill development with measurable outcomes. Track your progress with detailed analytics and performance metrics.</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0" style={{border: 'none', outline: 'none'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Certification</h3>
            <p className="text-gray-600 leading-relaxed">Earn industry-recognized credentials that validate your expertise and advance your professional career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;