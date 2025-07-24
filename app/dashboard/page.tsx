import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionList';
import CTA from '@/components/CTA';
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { Brain, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
                                Your Learning Dashboard
                            </h1>
                            <p className="text-gray-600 text-lg mt-2">
                                Continue your AI-powered learning journey
                            </p>
                        </div>
                    </div>
                </div>

                {/* Popular Companions Section */}
                <section className="mb-16">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Popular Companions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companions.map((companion) => (
                            <div key={companion.id} className="transform hover:scale-105 transition-all duration-300">
                                <CompanionCard
                                    {...companion}
                                    color={getSubjectColor(companion.subject)}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Build New Companion Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-orange-400/20 to-amber-400/20 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-orange-300/30 min-h-[300px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5"></div>
                        <div className="absolute top-4 right-4 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-4 left-4 w-24 h-24 bg-amber-200/20 rounded-full blur-xl"></div>

                        <div className="relative z-10 max-w-2xl">
                            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 mx-auto transform hover:scale-110 transition-all duration-300">
                                <Brain className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                Create Your Own AI Companion
                            </h2>

                            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                                Design a personalized AI learning companion tailored to your specific needs, subjects, and learning style. Build the perfect study partner today.
                            </p>

                            {/* Highlighted Build Button */}
                            <Link href="/companions/new">
                                <button className="group relative bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 text-white font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0 outline-none overflow-hidden">
                                    {/* Button glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>

                                    {/* Button content */}

                                    <div className="relative flex items-center space-x-4">
                                        <span>Build New Companion</span>
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                            <Brain className="w-5 h-5" />
                                        </div>
                                    </div>  

                                    {/* Animated background shimmer */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out"></div>
                                </button>
                            </Link>

                            {/* Feature highlights */}
                            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span>Custom Personality</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                    <span>Subject Specialization</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>Learning Style Adaptation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Sessions and CTA Section */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
                    {/* Recent Sessions */}
                    <div className="xl:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Recently Completed Sessions</h2>
                        </div>

                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                            <CompanionsList
                                title=""
                                companions={recentSessionsCompanions}
                                classNames="w-full"
                            />
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-gradient-to-br from-orange-100/80 to-amber-100/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <CTA />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Cards (Optional Enhancement) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Total Sessions</h3>
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">{recentSessionsCompanions.length}</p>
                        <p className="text-sm text-gray-600 mt-2">Learning sessions completed</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50/80 to-yellow-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Active Companions</h3>
                            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-amber-600">{companions.length}</p>
                        <p className="text-sm text-gray-600 mt-2">AI companions available</p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-yellow-600">85%</p>
                        <p className="text-sm text-gray-600 mt-2">Overall completion rate</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Page