import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Calendar, Link, Hash, User, FileText, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const createPredictionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(200, "Title must be less than 200 characters"),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  endDate: z.string().min(1, "End date is required"),
  resolutionLink: z.string().url("Must be a valid URL for resolution source"),
  predictionType: z.enum(["single", "double"]),
  creator: z.string().min(3, "Creator name must be at least 3 characters"),
  tags: z.string().optional(),
  singleOption: z.string().optional(),
  doubleOptionYes: z.string().optional(),
  doubleOptionNo: z.string().optional(),
}).refine((data) => {
  if (data.predictionType === "single") {
    return data.singleOption && data.singleOption.length > 0;
  }
  if (data.predictionType === "double") {
    return data.doubleOptionYes && data.doubleOptionNo && 
           data.doubleOptionYes.length > 0 && data.doubleOptionNo.length > 0;
  }
  return true;
}, {
  message: "Options are required based on prediction type",
  path: ["singleOption"]
});

type CreatePredictionForm = z.infer<typeof createPredictionSchema>;

const categories = [
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'politics', label: 'Politics', icon: '🏛️' },
  { value: 'crypto', label: 'Crypto', icon: '₿' },
  { value: 'tech', label: 'Technology', icon: '💻' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'economy', label: 'Economy', icon: '📈' }
];

export default function CreatePredictionPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<CreatePredictionForm>({
    resolver: zodResolver(createPredictionSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      endDate: "",
      resolutionLink: "",
      predictionType: "double",
      creator: "",
      tags: "",
      singleOption: "",
      doubleOptionYes: "Yes",
      doubleOptionNo: "No"
    }
  });

  const createPredictionMutation = useMutation({
    mutationFn: async (data: CreatePredictionForm) => {
      let options;
      if (data.predictionType === "single") {
        options = [{ label: data.singleOption }];
      } else {
        options = [
          { label: data.doubleOptionYes },
          { label: data.doubleOptionNo }
        ];
      }

      return apiRequest("/api/prediction-markets", {
        method: "POST",
        body: {
          title: data.title,
          description: data.description,
          category: data.category,
          endDate: data.endDate,
          resolutionLink: data.resolutionLink,
          predictionType: data.predictionType,
          creator: data.creator,
          options,
          tags
        }
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/prediction-markets"] });
      toast({
        title: "Prediction Created",
        description: "Your prediction market has been created successfully!",
      });
      navigate("/prediction-markets");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create prediction",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: CreatePredictionForm) => {
    createPredictionMutation.mutate(data);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const predictionType = form.watch("predictionType");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Prediction Market</h1>
        <p className="text-muted-foreground">
          Create a new prediction market for others to participate in. Choose between single outcome or yes/no predictions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Prediction Details
          </CardTitle>
          <CardDescription>
            Provide all the necessary information for your prediction market.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-6">
              {/* Prediction Type */}
              <FormField
                control={form.control}
                name="predictionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Prediction Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="double" id="double" data-testid="radio-prediction-type-double" />
                          <Label htmlFor="double" className="cursor-pointer">
                            <div>
                              <div className="font-medium">Yes/No Prediction</div>
                              <div className="text-sm text-muted-foreground">
                                Binary outcome prediction (e.g., "Will Bitcoin reach $110K by year end?")
                              </div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="single" data-testid="radio-prediction-type-single" />
                          <Label htmlFor="single" className="cursor-pointer">
                            <div>
                              <div className="font-medium">Single Outcome</div>
                              <div className="text-sm text-muted-foreground">
                                One specific outcome prediction (e.g., "Who will win the championship?")
                              </div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={predictionType === "double" ? 
                          "Will Bitcoin reach ATH before year ends?" : 
                          "Who will win the 2025 Championship?"
                        }
                        {...field}
                        data-testid="input-title"
                      />
                    </FormControl>
                    <FormDescription>
                      A clear, specific question that describes what you're predicting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed information about how this prediction will be resolved, including specific criteria and conditions..."
                        className="min-h-[120px]"
                        {...field}
                        data-testid="textarea-description"
                      />
                    </FormControl>
                    <FormDescription>
                      Explain the prediction criteria, resolution conditions, and any important details.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Options based on prediction type */}
              {predictionType === "single" ? (
                <FormField
                  control={form.control}
                  name="singleOption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Outcome Option</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter the specific outcome (e.g., 'Team A', 'Candidate Name')" 
                          {...field}
                          data-testid="input-single-option"
                        />
                      </FormControl>
                      <FormDescription>
                        The specific outcome that participants can bet on.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="doubleOptionYes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yes Option</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Yes" 
                            {...field}
                            data-testid="input-double-yes"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="doubleOptionNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No Option</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="No" 
                            {...field}
                            data-testid="input-double-no"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* End Date */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local" 
                        {...field}
                        data-testid="input-end-date"
                      />
                    </FormControl>
                    <FormDescription>
                      When this prediction market will close for new bets.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resolution Link */}
              <FormField
                control={form.control}
                name="resolutionLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Resolution Link
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="url"
                        placeholder="https://example.com/official-source" 
                        {...field}
                        data-testid="input-resolution-link"
                      />
                    </FormControl>
                    <FormDescription>
                      URL to the official source that will be used to resolve this prediction.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Creator */}
              <FormField
                control={form.control}
                name="creator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Creator Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your username or handle" 
                        {...field}
                        data-testid="input-creator"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4" />
                  Tags (Optional)
                </Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    data-testid="input-tag"
                  />
                  <Button 
                    type="button" 
                    onClick={addTag}
                    variant="outline"
                    size="sm"
                    data-testid="button-add-tag"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-muted rounded-sm"
                        data-testid={`button-remove-tag-${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Add up to 5 tags to help categorize your prediction.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex gap-3">
              <Button 
                type="submit" 
                disabled={createPredictionMutation.isPending}
                data-testid="button-create-prediction"
              >
                {createPredictionMutation.isPending ? "Creating..." : "Create Prediction"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/prediction-markets")}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}