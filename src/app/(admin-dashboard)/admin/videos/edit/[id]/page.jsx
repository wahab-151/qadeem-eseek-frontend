import VideoForm from "pages-sections/admin-dashboard/videos/page-view/video-form";

export default function EditVideoPage({ params }) {
  return <VideoForm videoId={params.id} />;
}
