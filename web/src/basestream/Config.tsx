import {StreamFieldSerializer} from "../stream/StreamField";
import {StreamContainer} from "./container/Container";
import {StreamRichText} from "./richtext/Richtext";
import {StreamContainers} from "./containers/Containers";
import {PageListBlock} from "./pagelist/PageListBlock";
import {StreamGalleryAdapter} from "./gallery/StreamGallery";


export function addBaseStreamFieldSerializers(out: Map<string, StreamFieldSerializer>) {
    out.set("containers", StreamContainers)
    out.set("container", StreamContainer)
    out.set("richtext", StreamRichText)
    out.set("gallery", StreamGalleryAdapter)
    out.set("pagelist", PageListBlock)
}
