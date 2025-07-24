"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { subjects } from "@/constants"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"
import { Brain, User, BookOpen, MessageSquare, Mic, Clock, Sparkles, ArrowRight } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion name is required.' }),
    subject: z.string().min(1, { message: 'Subject is required.' }),
    topic: z.string().min(1, { message: 'Topic is required.' }),
    voice: z.string().min(1, { message: 'Voice is required.' }),
    style: z.string().min(1, { message: 'Style is required.' }),
    duration: z.coerce.number().min(1, { message: 'Duration is required.' }),
})

const CompanionForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)

        const companion = await createCompanion(values)

        if (companion) {
            redirect(`/companions/${companion.id}`)
        } else {
            console.log('Failed to create a companion')
            redirect('/')
        }

        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-12 w-full max-w-4xl">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-amber-700 rounded-3xl flex items-center justify-center shadow-2xl">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent mb-4">
                        Build Your AI Companion
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Create a personalized AI learning companion tailored to your unique learning style and subject preferences.
                    </p>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-8 py-6 border-b border-orange-200/30 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                            <Brain className="w-6 h-6 mr-3 text-orange-600" />
                            Companion Configuration
                        </h2>
                        <p className="text-gray-600 mt-2">Fill in the details to create your perfect study partner</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto">
                                {/* Row 1: Name and Subject */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                                                    <User className="w-5 h-5 mr-2 text-orange-600" />
                                                    Companion Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="e.g., Alex the Math Tutor" 
                                                        {...field} 
                                                        className="h-12 text-lg border-2 border-orange-200/50 focus:border-orange-500 rounded-xl bg-white/70 backdrop-blur-sm transition-all duration-300"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                                                    <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
                                                    Subject
                                                </FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <SelectTrigger className="h-12 text-lg border-2 border-orange-200/50 focus:border-orange-500 rounded-xl bg-white/70 backdrop-blur-sm capitalize">
                                                            <SelectValue placeholder="Choose your subject" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-2 border-orange-200/50">
                                                            {subjects.map((subject) => (
                                                                <SelectItem 
                                                                    value={subject} 
                                                                    key={subject} 
                                                                    className="capitalize text-lg py-3 hover:bg-orange-50"
                                                                >
                                                                    {subject}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Topic Field - Full Width */}
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                                                <MessageSquare className="w-5 h-5 mr-2 text-orange-600" />
                                                What should your companion help with?
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder="e.g., Advanced calculus concepts like derivatives, integrals, and differential equations. Focus on problem-solving techniques and real-world applications." 
                                                    {...field} 
                                                    className="min-h-[120px] text-lg border-2 border-orange-200/50 focus:border-orange-500 rounded-xl bg-white/70 backdrop-blur-sm transition-all duration-300 resize-none"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />

                                {/* Row 2: Voice, Style, Duration */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="voice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                                                    <Mic className="w-5 h-5 mr-2 text-orange-600" />
                                                    Voice
                                                </FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <SelectTrigger className="h-12 text-lg border-2 border-orange-200/50 focus:border-orange-500 rounded-xl bg-white/70 backdrop-blur-sm">
                                                            <SelectValue placeholder="Choose voice" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-2 border-orange-200/50">
                                                            <SelectItem value="male" className="text-lg py-3 hover:bg-orange-50">
                                                                🎭 Male Voice
                                                            </SelectItem>
                                                            <SelectItem value="female" className="text-lg py-3 hover:bg-orange-50">
                                                                🎭 Female Voice
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="style"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                                                    <MessageSquare className="w-5 h-5 mr-2 text-orange-600" />
                                                    Teaching Style
                                                </FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <SelectTrigger className="h-12 text-lg border-2 border-orange-200/50 focus:border-orange-500 rounded-xl bg-white/70 backdrop-blur-sm">
                                                            <SelectValue placeholder="Choose style" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-2 border-orange-200/50">
                                                            <SelectItem value="formal" className="text-lg py-3 hover:bg-orange-50">
                                                                🎓 Formal & Academic
                                                            </SelectItem>
                                                            <SelectItem value="casual" className="text-lg py-3 hover:bg-orange-50">
                                                                😊 Casual & Friendly
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-800 flex items-center">
                                                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                                                    Duration (minutes)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        type="number" 
                                                        placeholder="15" 
                                                        {...field} 
                                                        className="h-12 text-lg border-2 border-orange-200/50 focus:border-orange-500 rounded-xl bg-white/70 backdrop-blur-sm transition-all duration-300"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-8">
                                    <Button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 hover:from-orange-700 hover:via-amber-700 hover:to-yellow-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 border-0 group overflow-hidden relative"
                                    >
                                        {/* Button glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                                        
                                        {/* Button content */}
                                        <div className="relative flex items-center justify-center space-x-4">
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                    <span>Building Your Companion...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                                                    <span>Build Your AI Companion</span>
                                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                                </>
                                            )}
                                        </div>
                                        
                                        {/* Animated background shimmer */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out"></div>
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

                {/* Features Preview */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Personalized AI</h3>
                        <p className="text-sm text-gray-600">Tailored to your learning style and pace</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50/80 to-yellow-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Interactive Learning</h3>
                        <p className="text-sm text-gray-600">Engaging conversations and explanations</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Flexible Sessions</h3>
                        <p className="text-sm text-gray-600">Learn at your own pace and schedule</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanionForm