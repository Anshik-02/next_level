import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const DeleteSnack = ({snack}) => {


     const handleDeleteSnack = async () => {
    try {
      const response = await axios.delete(`/api/snack/delete`, {
        data: { id: snack.id },
      });
      console.log("End session response:", response.data);
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };
    return (
        <div>
              <AlertDialog>
        <AlertDialogTrigger className="text-white" asChild>
        <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg 
                                 font-medium hover:bg-red-600 transition-all">
                Delete
              </button>
         
        </AlertDialogTrigger>
        <AlertDialogContent className="text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this snack</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the snack
              permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSnack}>
              Yes, Delete Snack
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </div>
    );
}

export default DeleteSnack;
