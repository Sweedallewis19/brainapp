import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
//import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
//import { BACKEND_URL } from "../config";
//import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  // New: track selected filter
  const [filter, setFilter] = useState<"youtube" | "twitter">("youtube");

  // Refresh content when modal closes (new content might have been added)
  useEffect(() => {
    refresh();
  }, [modalOpen]);

  // Filter content based on selected type
  const filteredContents = contents.filter(content => content.type === filter);

  return (
    <div>
      {/* Sidebar receives filter & setter */}
      <Sidebar filter={filter} setFilter={setFilter} />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />

          {/* <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          /> */}
        </div>

        {/* Display filtered content */}
        <div className="flex gap-4 flex-wrap pt-6">
          {filteredContents.map(({ type, link, title, _id }) => (
            <Card key={_id} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
