import React, { useState, Suspense, lazy } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Loader2, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Users, 
  DollarSign, 
  Gavel,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useRegistry } from '../context/RegistryContext';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Toaster, toast } from 'sonner';
import { cn } from '../lib/utils';
import { AlertCard } from '../components/ui/card-8';

const LocationPicker = lazy(() => import('../components/ui/LocationPicker'));

const steps = [
  { id: "deed", title: "Deed Details", icon: <FileText className="w-4 h-4" /> },
  { id: "parties", title: "Parties", icon: <Users className="w-4 h-4" /> },
  { id: "location", title: "Location", icon: <MapPin className="w-4 h-4" /> },
  { id: "financials", title: "Financials", icon: <DollarSign className="w-4 h-4" /> },
  { id: "review", title: "Mint", icon: <Gavel className="w-4 h-4" /> },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const TransferPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const { executeTransfer } = useRegistry();
  const [confirmedLocation, setConfirmedLocation] = useState(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      tokenId: "",
      currentOwner: "",
      landType: "Residential",
      area: "",
      buyerId: "",
      buyerName: "",
      newWallet: "",
      value: "",
      stampDuty: "5.0",
      additionalNotes: ""
    }
  });

  const formData = watch();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      executeTransfer(
        data.tokenId, 
        data.buyerName || data.newWallet, 
        data.value,
        {
          landType: data.landType,
          area: data.area,
          location: confirmedLocation?.address || 'Unknown',
          coords: confirmedLocation?.coords || null,
        }
      );
      toast.success("Transaction submitted to blockchain!");
      setIsSubmitting(false);
      setIsSuccessVisible(true);
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.tokenId && formData.currentOwner && formData.area;
      case 1:
        return formData.buyerId && formData.buyerName && formData.newWallet;
      case 2:
        return confirmedLocation !== null;
      case 3:
        return formData.value && formData.stampDuty;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 relative overflow-hidden">
      <Toaster position="top-right" richColors />
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Property Transfer Portal</h1>
          <p className="text-gray-500">Cryptographically secure ownership migration</p>
        </div>

        {/* Progress System */}
        <div className="mb-8 px-4">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
            <motion.div 
                className="absolute top-1/2 left-0 h-0.5 bg-accent-teal -z-10 -translate-y-1/2 transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => index < currentStep && setCurrentStep(index)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10",
                    index < currentStep ? "bg-accent-teal text-white shadow-lg" :
                    index === currentStep ? "bg-white border-2 border-accent-teal text-accent-teal shadow-xl ring-4 ring-accent-teal/10" :
                    "bg-white border border-gray-200 text-gray-400 shadow-sm"
                  )}
                >
                  {index < currentStep ? <Check className="w-5 h-5" /> : step.icon}
                </motion.button>
                <span className={cn(
                  "text-[10px] mt-2 font-bold tracking-widest uppercase transition-colors duration-300",
                  index === currentStep ? "text-accent-teal" : "text-gray-400"
                )}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2.5rem] bg-white/80 backdrop-blur-xl overflow-hidden border border-white/20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                        <CardDescription>Complete the details for this transaction phase</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-4">
                        {/* Step 1: Deed Details */}
                        {currentStep === 0 && (
                            <>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Property Token ID / Survey No.</Label>
                                        <Input {...register("tokenId")} placeholder="e.g. Survey 142B" className="bg-white border-gray-200" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Current Registered Owner</Label>
                                        <Input {...register("currentOwner")} placeholder="Full Name as per records" className="bg-white border-gray-200" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                                        <div className="space-y-3">
                                            <Label className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Land Classification</Label>
                                            <Select 
                                                defaultValue={formData.landType} 
                                                onValueChange={(val) => setValue("landType", val)}
                                            >
                                                <SelectTrigger className="w-full bg-white border-gray-200">
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-gray-200 shadow-2xl z-[200]">
                                                    <SelectItem value="Residential">Residential Plot</SelectItem>
                                                    <SelectItem value="Agricultural">Agricultural Land</SelectItem>
                                                    <SelectItem value="Commercial">Commercial Property</SelectItem>
                                                    <SelectItem value="Industrial">Industrial Zone</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Total Land Area</Label>
                                            <Input {...register("area")} placeholder="e.g. 2.4 Acres" className="bg-white border-gray-200" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 2: Parties */}
                        {currentStep === 1 && (
                            <>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Buyer Identity Hash (Aadhaar/PAN)</Label>
                                        <Input {...register("buyerId")} placeholder="Cryptographic Identity String" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>New Owner Legal Name</Label>
                                        <Input {...register("buyerName")} placeholder="Full Name of Transferee" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>New Owner Wallet Address</Label>
                                        <Input {...register("newWallet")} placeholder="0x..." className="font-mono text-xs" />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 3: Location */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <Label>Pin-point Exact Plot Location</Label>
                                <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />}>
                                    <LocationPicker onLocationConfirmed={setConfirmedLocation} />
                                </Suspense>
                                {confirmedLocation && (
                                    <div className="p-3 bg-accent-teal/5 border border-accent-teal/20 rounded-2xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-accent-teal" />
                                            <div>
                                                <p className="text-xs font-bold text-accent-teal">Location Confirmed</p>
                                                <p className="text-[10px] text-gray-500 truncate max-w-[200px]">{confirmedLocation.address}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => setConfirmedLocation(null)} className="h-8 text-xs">Reset</Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Financials */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Total Consideration (INR)</Label>
                                    <Input {...register("value")} placeholder="₹ 0.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Stamp Duty %</Label>
                                    <Input type="number" step="0.1" {...register("stampDuty")} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Additional Transaction Notes</Label>
                                    <Textarea {...register("additionalNotes")} placeholder="Any contractual caveats..." />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Review & Mint */}
                        {currentStep === 4 && (
                            <div className="space-y-4 py-2 text-sm">
                                <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Property</span><span className="font-bold">{formData.tokenId}</span></div>
                                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500">New Owner</span><span className="font-bold">{formData.buyerName}</span></div>
                                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Value</span><span className="font-bold">₹ {formData.value}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Land Type</span><span className="font-bold">{formData.landType}</span></div>
                                </div>
                                <div className="flex gap-3 p-4 bg-accent-orange/5 border border-accent-orange/20 rounded-2xl">
                                    <AlertCircle className="w-5 h-5 text-accent-orange shrink-0" />
                                    <p className="text-[11px] text-accent-orange/80 leading-relaxed font-medium">Warning: Clicking Mint will anchor this data to the blockchain. This record is immutable and legally binding upon confirmation.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between pt-6 border-t border-gray-100">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 0 || isSubmitting}
                            className="rounded-xl px-6"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                        
                        <Button
                            onClick={currentStep === steps.length - 1 ? handleSubmit(onSubmit) : handleNext}
                            disabled={!isStepValid() || isSubmitting}
                            className={cn(
                                "rounded-xl px-8 transition-all duration-300",
                                currentStep === steps.length - 1 ? "bg-accent-orange hover:bg-accent-orange/90" : "bg-accent-teal hover:bg-accent-teal/90"
                            )}
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {currentStep === steps.length - 1 ? "Mint Record" : "Continue"}
                            {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </CardFooter>
                </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Step {currentStep + 1} of {steps.length} &mdash; {steps[currentStep].title}
        </div>
      </div>

      {/* Success Success Component */}
      <AnimatePresence>
        {isSuccessVisible && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <AlertCard
                    isVisible={isSuccessVisible}
                    title="Transfer Successful"
                    description={`Property ${formData.tokenId} has been successfully minted to the decentralized registry for ${formData.buyerName}.`}
                    buttonText="View Records"
                    onButtonClick={() => window.location.href = '/registry'}
                    onDismiss={() => setIsSuccessVisible(false)}
                    icon={<Check className="w-6 h-6 text-white" />}
                />
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10"
                    onClick={() => setIsSuccessVisible(false)}
                />
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferPage;
