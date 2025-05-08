"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Team {
  id: string;
  name: string;
}

interface UpdateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  currentStatus?: string;
  currentAssignee?: string;
  onSuccess?: () => void;
}

const TEAMS: Team[] = [
  { id: "Road Maintenance Team", name: "Road Maintenance Team" },
  { id: "Electrical Team", name: "Electrical Team" },
  { id: "Sanitation Team", name: "Sanitation Team" },
  { id: "Water Management Team", name: "Water Management Team" },
  { id: "Public Property Team", name: "Public Property Team" },
];

export function UpdateReportModal({
  isOpen,
  onClose,
  reportId,
  currentStatus,
  currentAssignee,
  onSuccess,
}: UpdateReportModalProps) {
  const [status, setStatus] = useState(currentStatus || "");
  const [team, setTeam] = useState(currentAssignee || "unassigned");
  console.log("Current Assignee:", team);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!status && !team) {
      toast({
        title: "Error",
        description: "Please update either status or team assignment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the update data
      const updateData: {
        id: string;
        status?: string;
        assignedTo?: string | null;
        comment: string;
        updatedBy: string;
      } = {
        id: reportId,
        comment: comment || "Report updated",
        updatedBy: "Admin User", // Ideally this would come from the authenticated user
      };

      // Add status if changed
      if (status && status !== currentStatus) {
        updateData.status = status;
      }

      // Add team if changed
      if (team !== currentAssignee) {
        // If unassigned is selected, set assignedTo to null
        if (team === "unassigned") {
          updateData.assignedTo = null;
        } else {
          updateData.assignedTo =
            TEAMS.find((t) => t.id === team)?.name || team;
        }
      }

      // Call the API to update the report
      const response = await fetch(`/api/report`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update report");
      }

      const data = await response.json();

      toast({
        title: "Success",
        description: "Report updated successfully",
      });

      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error updating report:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update report",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Report</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team" className="text-right">
              Assign Team
            </Label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger id="team" className="col-span-3">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {TEAMS.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Textarea
              id="comment"
              placeholder="Add comment (optional)"
              className="col-span-3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#003A70] hover:bg-[#004d94]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
