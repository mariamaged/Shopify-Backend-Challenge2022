export default class Image {
    constructor(props) {
        this.userId = props.userId;
        this.permission = props.isPublic === true || props.isPublic === 'true'
            ? 'public' : 'private';
        this.description = props.description;
        this.keywords = props.keywords;
        this.bytes = props.size;
        this.filename = props.filename;
        this.linkUrl = props.linkUrl;
    }
}