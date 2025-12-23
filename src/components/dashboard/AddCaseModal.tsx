import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Hash, User, FileText, Loader2 } from 'lucide-react';
import { SearchType } from '@/types/case';
import { caseTypes } from '@/data/mockCases';
import { useToast } from '@/hooks/use-toast';

interface AddCaseModalProps {
  onAddCase?: (data: any) => void;
}

export function AddCaseModal({ onAddCase }: AddCaseModalProps) {
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState<SearchType>('cnr');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [cnrNumber, setCnrNumber] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [diaryNumber, setDiaryNumber] = useState('');
  const [partyName, setPartyName] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    
    toast({
      title: "Case Found",
      description: "Case details have been retrieved and added to your tracker.",
    });
    
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCnrNumber('');
    setCaseType('');
    setCaseNumber('');
    setYear(new Date().getFullYear().toString());
    setDiaryNumber('');
    setPartyName('');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-gold">
          <Plus className="w-4 h-4 mr-2" />
          Add New Case
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Add New Case</DialogTitle>
        </DialogHeader>
        
        <Tabs value={searchType} onValueChange={(v) => setSearchType(v as SearchType)} className="mt-4">
          <TabsList className="grid grid-cols-4 w-full bg-muted">
            <TabsTrigger value="cnr" className="text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Hash className="w-3 h-3 mr-1 hidden sm:inline" />
              CNR
            </TabsTrigger>
            <TabsTrigger value="caseNo" className="text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <FileText className="w-3 h-3 mr-1 hidden sm:inline" />
              Case No
            </TabsTrigger>
            <TabsTrigger value="diaryNo" className="text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <FileText className="w-3 h-3 mr-1 hidden sm:inline" />
              Diary No
            </TabsTrigger>
            <TabsTrigger value="partyName" className="text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <User className="w-3 h-3 mr-1 hidden sm:inline" />
              Party
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cnr" className="mt-6 space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="cnr">CNR Number</Label>
              <Input
                id="cnr"
                placeholder="Enter 16-digit CNR Number"
                value={cnrNumber}
                onChange={(e) => setCnrNumber(e.target.value.toUpperCase())}
                maxLength={16}
                className="font-mono tracking-wider"
              />
              <p className="text-xs text-muted-foreground">
                Example: DLHC010001232024
              </p>
            </div>
          </TabsContent>

          <TabsContent value="caseNo" className="mt-6 space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label>Case Type</Label>
              <Select value={caseType} onValueChange={setCaseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  {caseTypes.map((type) => (
                    <SelectItem key={type.code} value={type.code}>
                      {type.code} - {type.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caseNumber">Case Number</Label>
                <Input
                  id="caseNumber"
                  placeholder="1234"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearCase">Year</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="diaryNo" className="mt-6 space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="diaryNumber">Diary Number</Label>
                <Input
                  id="diaryNumber"
                  placeholder="Enter diary number"
                  value={diaryNumber}
                  onChange={(e) => setDiaryNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearDiary">Year</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="partyName" className="mt-6 space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="partyName">Party Name (Petitioner/Respondent)</Label>
              <Input
                id="partyName"
                placeholder="Enter party name"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearParty">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        {/* Captcha Placeholder */}
        <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-4">
            <div className="w-32 h-12 bg-muted rounded flex items-center justify-center border border-border">
              <span className="text-xs text-muted-foreground">CAPTCHA</span>
            </div>
            <Input placeholder="Enter captcha" className="flex-1" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            * Captcha will be auto-solved in the background
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search Case
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
