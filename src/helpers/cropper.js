import load from './load';

export default {
    render(h) {
        return h('div', {style: this.containerStyle}, [
            h('img', {
                ref: 'img',
                attrs: {
                    src: this.src,
                    style: 'max-width: 100%',
                },
                style: this.imgStyle,
            }),
        ]);
    },
    props: {
        containerStyle: Object,
        src: {
            type: String,
            default: '',
        },
        imgStyle: Object,

        // CropperJS options
        // see https://github.com/fengyuanchen/cropperjs#options
        options: Object,
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            await load([
                'https://cdn.jsdelivr.net/npm/cropperjs@1/dist/cropper.min.js',
                'css!https://cdn.jsdelivr.net/npm/cropperjs@1/dist/cropper.min.css',
            ], 'cropperjs');
            this.cropper = new window.Cropper(this.$refs.img, this.options);
        },
        // Reset the image and crop box to their initial states
        reset() {
            return this.cropper.reset();
        },

        // Clear the crop box
        clear() {
            return this.cropper.clear();
        },

        // Init crop box manually
        initCrop() {
            return this.cropper.crop();
        },

        /**
         * Replace the image's src and rebuild the cropper
         * @param {string} url - The new URL.
         * @param {boolean} [onlyColorChanged] - Indicate if the new image only changed color.
         * @returns {Object} this
         */
        replace(url, onlyColorChanged = false) {
            return this.cropper.replace(url, onlyColorChanged);
        },

        // Enable (unfreeze) the cropper
        enable() {
            return this.cropper.enable();
        },

        // Disable (freeze) the cropper
        disable() {
            return this.cropper.disable();
        },

        // Destroy the cropper and remove the instance from the image
        destroy() {
            return this.cropper.destroy();
        },

        /**
         * Move the canvas with relative offsets
         * @param {number} offsetX - The relative offset distance on the x-axis.
         * @param {number} offsetY - The relative offset distance on the y-axis.
         * @returns {Object} this
         */
        move(offsetX, offsetY) {
            return this.cropper.move(offsetX, offsetY);
        },

        /**
         * Move the canvas to an absolute point
         * @param {number} x - The x-axis coordinate.
         * @param {number} [y=x] - The y-axis coordinate.
         * @returns {Object} this
         */
        moveTo(x, y = x) {
            return this.cropper.moveTo(x, y);
        },

        /**
         * Zoom the canvas with a relative ratio
         * @param {number} ratio - The target ratio.
         * @param {Event} _originalEvent - The original event if any.
         * @returns {Object} this
         */
        relativeZoom(ratio, _originalEvent) {
            return this.cropper.zoom(ratio, _originalEvent);
        },

        /**
         * Zoom the canvas to an absolute ratio
         * @param {number} ratio - The target ratio.
         * @param {Event} _originalEvent - The original event if any.
         * @returns {Object} this
         */
        zoomTo(ratio, _originalEvent) {
            return this.cropper.zoomTo(ratio, _originalEvent);
        },

        /**
         * Rotate the canvas with a relative degree
         * @param {number} degree - The rotate degree.
         * @returns {Object} this
         */
        rotate(degree) {
            return this.cropper.rotate(degree);
        },

        /**
         * Rotate the canvas to an absolute degree
         * @param {number} degree - The rotate degree.
         * @returns {Object} this
         */
        rotateTo(degree) {
            return this.cropper.rotateTo(degree);
        },

        /**
         * Scale the image on the x-axis.
         * @param {number} scaleX - The scale ratio on the x-axis.
         * @returns {Object} this
         */
        scaleX(scaleX) {
            return this.cropper.scaleX(scaleX);
        },

        /**
         * Scale the image on the y-axis.
         * @param {number} scaleY - The scale ratio on the y-axis.
         * @returns {Object} this
         */
        scaleY(scaleY) {
            return this.cropper.scaleY(scaleY);
        },

        /**
         * Scale the image
         * @param {number} scaleX - The scale ratio on the x-axis.
         * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
         * @returns {Object} this
         */
        scale(scaleX, scaleY = scaleX) {
            return this.cropper.scale(scaleX, scaleY);
        },

        /**
         * Get the cropped area position and size data (base on the original image)
         * @param {boolean} [rounded=false] - Indicate if round the data values or not.
         * @returns {Object} The result cropped data.
         */
        getData(rounded = false) {
            return this.cropper.getData(rounded);
        },

        /**
         * Set the cropped area position and size with new data
         * @param {Object} data - The new data.
         * @returns {Object} this
         */
        setData(data) {
            return this.cropper.setData(data);
        },

        /**
         * Get the container size data.
         * @returns {Object} The result container data.
         */
        getContainerData() {
            return this.cropper.getContainerData();
        },

        /**
         * Get the image position and size data.
         * @returns {Object} The result image data.
         */
        getImageData() {
            return this.cropper.getImageData();
        },

        /**
         * Get the canvas position and size data.
         * @returns {Object} The result canvas data.
         */
        getCanvasData() {
            return this.cropper.getCanvasData();
        },

        /**
         * Set the canvas position and size with new data.
         * @param {Object} data - The new canvas data.
         * @returns {Object} this
         */
        setCanvasData(data) {
            return this.cropper.setCanvasData(data);
        },

        /**
         * Get the crop box position and size data.
         * @returns {Object} The result crop box data.
         */
        getCropBoxData() {
            return this.cropper.getCropBoxData();
        },

        /**
         * Set the crop box position and size with new data.
         * @param {Object} data - The new crop box data.
         * @returns {Object} this
         */
        setCropBoxData(data) {
            return this.cropper.setCropBoxData(data);
        },

        /**
         * Get a canvas drawn the cropped image.
         * @param {Object} [options={}] - The config options.
         * @returns {HTMLCanvasElement} - The result canvas.
         */
        getCroppedCanvas(options = {}) {
            return this.cropper.getCroppedCanvas(options);
        },

        /**
         * Change the aspect ratio of the crop box.
         * @param {number} aspectRatio - The new aspect ratio.
         * @returns {Object} this
         */
        setAspectRatio(aspectRatio) {
            return this.cropper.setAspectRatio(aspectRatio);
        },

        /**
         * Change the drag mode.
         * @param {string} mode - The new drag mode.
         * @returns {Object} this
         */
        setDragMode(mode) {
            return this.cropper.setDragMode(mode);
        },
    },
};
