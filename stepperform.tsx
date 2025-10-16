"use client";

import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Building2,
    Heart,
    Users,
    BarChart3,
    TrendingUp,
    FileText,
    User,
    CheckCircle2,
    Upload,
    X,
} from "lucide-react";

interface FormData {
    // Section 1: Company Information
    companyName: string;
    applicantName: string;
    position: string;
    email: string;
    contactNumber: string;
    sector: string;
    yearEstablished: string;
    numberOfEmployees: string;

    // Section 2: Social Impact Overview
    missionStatement: string;
    socialIssue: string;
    businessModel: string;

    // Section 3: Implementation & Activities
    keyInitiatives: string;
    stakeholderEngagement: string;
    partnerships: string;

    // Section 4: Impact Measurement
    measurableImpact: string;
    feedbackExamples: string;
    impactContribution: string;

    // Section 5: Future & Scalability
    futureGoals: string;
    sustainabilityPlan: string;
    supportNeeded: string;

    // Section 6: Supporting Evidence
    documents: File[];
    photos: File[];
    mediaLinks: string;

    // Section 7: Personal Story
    personalStory: string;

    // Declaration
    declaration: boolean;
}

export default function SocialImapctAwardForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        companyName: "",
        applicantName: "",
        position: "",
        email: "",
        contactNumber: "",
        sector: "",
        yearEstablished: "",
        numberOfEmployees: "",
        missionStatement: "",
        socialIssue: "",
        businessModel: "",
        keyInitiatives: "",
        stakeholderEngagement: "",
        partnerships: "",
        measurableImpact: "",
        feedbackExamples: "",
        impactContribution: "",
        futureGoals: "",
        sustainabilityPlan: "",
        supportNeeded: "",
        documents: [],
        photos: [],
        mediaLinks: "",
        personalStory: "",
        declaration: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const steps = [
        { title: "Company Information", icon: Building2 },
        { title: "Social Impact Overview", icon: Heart },
        { title: "Implementation & Activities", icon: Users },
        { title: "Impact Measurement", icon: BarChart3 },
        { title: "Future & Scalability", icon: TrendingUp },
        { title: "Supporting Evidence", icon: FileText },
        { title: "Personal Story", icon: User },
        { title: "Declaration", icon: CheckCircle2 },
    ];

    const handleInputChange = (
        field: keyof FormData,
        value: string | boolean | File[]
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleFileChange = (
        field: "documents" | "photos",
        files: FileList | null
    ) => {
        if (files) {
            const fileArray = Array.from(files);
            setFormData((prev) => ({
                ...prev,
                [field]: [...prev[field], ...fileArray],
            }));
        }
    };

    const removeFile = (field: "documents" | "photos", index: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 0:
                if (!formData.companyName.trim())
                    newErrors.companyName = "Company name is required";
                if (!formData.applicantName.trim())
                    newErrors.applicantName = "Applicant name is required";
                if (!formData.position.trim())
                    newErrors.position = "Position is required";
                if (!formData.email.trim())
                    newErrors.email = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                    newErrors.email = "Invalid email format";
                if (!formData.contactNumber.trim())
                    newErrors.contactNumber = "Contact number is required";
                if (!formData.sector.trim())
                    newErrors.sector = "Sector is required";
                if (!formData.yearEstablished.trim())
                    newErrors.yearEstablished = "Year established is required";
                if (!formData.numberOfEmployees.trim())
                    newErrors.numberOfEmployees =
                        "Number of employees is required";
                break;
            case 1:
                if (!formData.missionStatement.trim())
                    newErrors.missionStatement =
                        "Mission statement is required";
                else if (formData.missionStatement.split(" ").length > 400)
                    newErrors.missionStatement = "Maximum 400 words allowed";
                if (!formData.socialIssue.trim())
                    newErrors.socialIssue = "Social issue is required";
                if (!formData.businessModel.trim())
                    newErrors.businessModel = "Business model is required";
                break;
            case 2:
                if (!formData.keyInitiatives.trim())
                    newErrors.keyInitiatives = "Key initiatives are required";
                if (!formData.stakeholderEngagement.trim())
                    newErrors.stakeholderEngagement =
                        "Stakeholder engagement is required";
                if (!formData.partnerships.trim())
                    newErrors.partnerships =
                        "Partnerships information is required";
                break;
            case 3:
                if (!formData.measurableImpact.trim())
                    newErrors.measurableImpact =
                        "Measurable impact is required";
                if (!formData.feedbackExamples.trim())
                    newErrors.feedbackExamples =
                        "Feedback examples are required";
                if (!formData.impactContribution.trim())
                    newErrors.impactContribution =
                        "Impact contribution is required";
                break;
            case 4:
                if (!formData.futureGoals.trim())
                    newErrors.futureGoals = "Future goals are required";
                if (!formData.sustainabilityPlan.trim())
                    newErrors.sustainabilityPlan =
                        "Sustainability plan is required";
                if (!formData.supportNeeded.trim())
                    newErrors.supportNeeded = "Support needed is required";
                break;
            case 5:
                // Supporting evidence is optional but we can add validation if needed
                break;
            case 6:
                if (
                    formData.personalStory.trim() &&
                    formData.personalStory.split(" ").length > 300
                ) {
                    newErrors.personalStory = "Maximum 300 words allowed";
                }
                break;
            case 7:
                if (!formData.declaration)
                    newErrors.declaration = "You must accept the declaration";
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleSubmit = () => {
        if (validateStep(currentStep)) {
            console.log("Form submitted:", formData);
            alert("Application submitted successfully!");
            // Here you would typically send the data to your backend
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Social Impact Entrepreneur Award
                            </h1>
                            <p className="text-sm text-slate-600">
                                Application Form
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;

                            return (
                                <div
                                    key={index}
                                    className="flex items-center flex-1"
                                >
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                                                    : isCompleted
                                                      ? "bg-emerald-500 text-white"
                                                      : "bg-slate-100 text-slate-400"
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span
                                            className={`text-xs mt-2 text-center hidden sm:block ${
                                                isActive
                                                    ? "text-emerald-600 font-semibold"
                                                    : isCompleted
                                                      ? "text-emerald-600"
                                                      : "text-slate-400"
                                            }`}
                                        >
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                                                isCompleted
                                                    ? "bg-emerald-500"
                                                    : "bg-slate-200"
                                            }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    {/* Section 1: Company Information */}
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Company Information
                                </h2>
                                <p className="text-slate-600">
                                    Please provide your company details
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Company Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "companyName",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.companyName
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        placeholder="Enter your company name"
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.companyName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Name of Applicant{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.applicantName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "applicantName",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.applicantName
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        placeholder="Founder/Representative name"
                                    />
                                    {errors.applicantName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.applicantName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Position/Role{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.position}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "position",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.position
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        placeholder="Your position in the company"
                                    />
                                    {errors.position && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.position}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Contact Number{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.contactNumber}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "contactNumber",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.contactNumber
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        placeholder="+60 12-345 6789"
                                    />
                                    {errors.contactNumber && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.contactNumber}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Sector/Industry{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.sector}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "sector",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.sector
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                    >
                                        <option value="">Select sector</option>
                                        <option value="Manufacturing">
                                            Manufacturing
                                        </option>
                                        <option value="Services">
                                            Services
                                        </option>
                                        <option value="Agribusiness">
                                            Agribusiness
                                        </option>
                                        <option value="Social Enterprise">
                                            Social Enterprise
                                        </option>
                                        <option value="Technology">
                                            Technology
                                        </option>
                                        <option value="Healthcare">
                                            Healthcare
                                        </option>
                                        <option value="Education">
                                            Education
                                        </option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.sector && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.sector}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Year Established{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.yearEstablished}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "yearEstablished",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.yearEstablished
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        placeholder="2020"
                                    />
                                    {errors.yearEstablished && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.yearEstablished}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Current No. of Employees{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.numberOfEmployees}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "numberOfEmployees",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.numberOfEmployees
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        placeholder="10"
                                    />
                                    {errors.numberOfEmployees && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.numberOfEmployees}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 2: Social Impact Overview */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Social Impact Overview
                                </h2>
                                <p className="text-slate-600">
                                    Tell us about your social mission and impact
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Describe your company's mission and
                                        commitment to social impact{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-xs text-slate-500 mb-2">
                                        Maximum 400 words
                                    </p>
                                    <textarea
                                        value={formData.missionStatement}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "missionStatement",
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.missionStatement
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Describe your mission and social commitment..."
                                    />
                                    <div className="flex justify-between items-center mt-1">
                                        {errors.missionStatement && (
                                            <p className="text-red-500 text-sm">
                                                {errors.missionStatement}
                                            </p>
                                        )}
                                        <p className="text-xs text-slate-500 ml-auto">
                                            {
                                                formData.missionStatement
                                                    .split(" ")
                                                    .filter((w) => w).length
                                            }{" "}
                                            / 400 words
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        What specific social or community issue
                                        does your business address?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.socialIssue}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "socialIssue",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.socialIssue
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Describe the social or community issue..."
                                    />
                                    {errors.socialIssue && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.socialIssue}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        How does your business model integrate
                                        both financial sustainability and social
                                        impact?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.businessModel}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "businessModel",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.businessModel
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Explain your business model..."
                                    />
                                    {errors.businessModel && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.businessModel}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 3: Implementation & Activities */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Implementation & Activities
                                </h2>
                                <p className="text-slate-600">
                                    Share your initiatives and partnerships
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        What key initiatives, projects, or
                                        programs has your company implemented to
                                        create social impact?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.keyInitiatives}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "keyInitiatives",
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.keyInitiatives
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Describe your key initiatives and programs..."
                                    />
                                    {errors.keyInitiatives && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.keyInitiatives}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        How do you engage stakeholders
                                        (employees, community, NGOs, government)
                                        in your social impact activities?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.stakeholderEngagement}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "stakeholderEngagement",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.stakeholderEngagement
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Describe stakeholder engagement..."
                                    />
                                    {errors.stakeholderEngagement && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.stakeholderEngagement}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        What partnerships or collaborations have
                                        supported your social mission?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.partnerships}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "partnerships",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.partnerships
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="List partnerships and collaborations..."
                                    />
                                    {errors.partnerships && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.partnerships}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 4: Impact Measurement */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Impact Measurement
                                </h2>
                                <p className="text-slate-600">
                                    Quantify and demonstrate your social impact
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        What measurable social impact has your
                                        business created?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-xs text-slate-500 mb-2">
                                        e.g., number of beneficiaries, jobs
                                        created for marginalized groups,
                                        community development, sustainability
                                        initiatives
                                    </p>
                                    <textarea
                                        value={formData.measurableImpact}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "measurableImpact",
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.measurableImpact
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Provide measurable impact data..."
                                    />
                                    {errors.measurableImpact && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.measurableImpact}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Provide examples of feedback,
                                        testimonials, or recognition received
                                        for your social initiatives{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.feedbackExamples}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "feedbackExamples",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.feedbackExamples
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Share feedback and testimonials..."
                                    />
                                    {errors.feedbackExamples && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.feedbackExamples}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        How has your social impact contributed
                                        to your company's growth, credibility,
                                        or branding?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.impactContribution}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "impactContribution",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.impactContribution
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Describe the contribution to your business..."
                                    />
                                    {errors.impactContribution && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.impactContribution}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 5: Future & Scalability */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Future & Scalability
                                </h2>
                                <p className="text-slate-600">
                                    Share your vision for expanding social
                                    impact
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        What are your future goals for expanding
                                        your social impact in the next 2–3
                                        years?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.futureGoals}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "futureGoals",
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.futureGoals
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Describe your future goals..."
                                    />
                                    {errors.futureGoals && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.futureGoals}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        How do you plan to sustain and scale
                                        your social initiatives while
                                        maintaining financial viability?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.sustainabilityPlan}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "sustainabilityPlan",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.sustainabilityPlan
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Explain your sustainability plan..."
                                    />
                                    {errors.sustainabilityPlan && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.sustainabilityPlan}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        What support (mentorship, partnerships,
                                        funding, policy) would help your company
                                        amplify its social impact?{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.supportNeeded}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "supportNeeded",
                                                e.target.value
                                            )
                                        }
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.supportNeeded
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Describe the support you need..."
                                    />
                                    {errors.supportNeeded && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.supportNeeded}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 6: Supporting Evidence */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Supporting Evidence
                                </h2>
                                <p className="text-slate-600">
                                    Upload documents and media that demonstrate
                                    your impact
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Upload documents, testimonials, or case
                                        studies
                                    </label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                        <p className="text-sm text-slate-600 mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            PDF, DOC, DOCX (max 10MB each)
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) =>
                                                handleFileChange(
                                                    "documents",
                                                    e.target.files
                                                )
                                            }
                                            className="hidden"
                                            id="documents-upload"
                                        />
                                        <label
                                            htmlFor="documents-upload"
                                            className="inline-block mt-3 px-4 py-2 bg-emerald-500 text-white rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors"
                                        >
                                            Choose Files
                                        </label>
                                    </div>
                                    {formData.documents.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {formData.documents.map(
                                                (file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-lg"
                                                    >
                                                        <span className="text-sm text-slate-700">
                                                            {file.name}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeFile(
                                                                    "documents",
                                                                    index
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Upload photos or media coverage
                                    </label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                        <p className="text-sm text-slate-600 mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            JPG, PNG, GIF (max 5MB each)
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleFileChange(
                                                    "photos",
                                                    e.target.files
                                                )
                                            }
                                            className="hidden"
                                            id="photos-upload"
                                        />
                                        <label
                                            htmlFor="photos-upload"
                                            className="inline-block mt-3 px-4 py-2 bg-emerald-500 text-white rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors"
                                        >
                                            Choose Files
                                        </label>
                                    </div>
                                    {formData.photos.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {formData.photos.map(
                                                (file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between bg-slate-50 px-4 py-2 rounded-lg"
                                                    >
                                                        <span className="text-sm text-slate-700">
                                                            {file.name}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeFile(
                                                                    "photos",
                                                                    index
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Provide links to videos, interviews, or
                                        publications
                                    </label>
                                    <textarea
                                        value={formData.mediaLinks}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "mediaLinks",
                                                e.target.value
                                            )
                                        }
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Enter URLs (one per line)&#10;https://youtube.com/...&#10;https://news.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 7: Personal Story */}
                    {currentStep === 6 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Personal Story (Optional)
                                </h2>
                                <p className="text-slate-600">
                                    Share your personal journey and motivation
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Share your personal story or reflection
                                        on why social impact is important to you
                                        as an entrepreneur
                                    </label>
                                    <p className="text-xs text-slate-500 mb-2">
                                        Maximum 300 words (Optional)
                                    </p>
                                    <textarea
                                        value={formData.personalStory}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "personalStory",
                                                e.target.value
                                            )
                                        }
                                        rows={8}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.personalStory
                                                ? "border-red-500"
                                                : "border-slate-300"
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none`}
                                        placeholder="Share your personal story and motivation..."
                                    />
                                    <div className="flex justify-between items-center mt-1">
                                        {errors.personalStory && (
                                            <p className="text-red-500 text-sm">
                                                {errors.personalStory}
                                            </p>
                                        )}
                                        <p className="text-xs text-slate-500 ml-auto">
                                            {
                                                formData.personalStory
                                                    .split(" ")
                                                    .filter((w) => w).length
                                            }{" "}
                                            / 300 words
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 8: Declaration */}
                    {currentStep === 7 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Declaration
                                </h2>
                                <p className="text-slate-600">
                                    Please review and accept the declaration
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="declaration"
                                        checked={formData.declaration}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "declaration",
                                                e.target.checked
                                            )
                                        }
                                        className="mt-1 w-5 h-5 text-emerald-500 border-slate-300 rounded focus:ring-emerald-500"
                                    />
                                    <label
                                        htmlFor="declaration"
                                        className="text-sm text-slate-700 cursor-pointer"
                                    >
                                        <span className="font-semibold">
                                            I hereby declare
                                        </span>{" "}
                                        that the information submitted is
                                        accurate and can be verified by NEST if
                                        required. I understand that providing
                                        false information may result in
                                        disqualification from the award process.
                                    </label>
                                </div>
                                {errors.declaration && (
                                    <p className="text-red-500 text-sm mt-2 ml-8">
                                        {errors.declaration}
                                    </p>
                                )}
                            </div>

                            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                                <h3 className="font-semibold text-emerald-900 mb-2">
                                    Application Summary
                                </h3>
                                <p className="text-sm text-emerald-800">
                                    You have completed all sections of the
                                    Social Impact Entrepreneur Award
                                    application. Please review your information
                                    before submitting. Once submitted, you will
                                    receive a confirmation email and our team
                                    will review your application.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                                currentStep === 0
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Previous
                        </button>

                        {currentStep < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
