import React__default, { createElement, Fragment } from 'react';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-jsx';

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }

    return target;
}

var types = ["video", "image", "embed", "figma"];

var Asset = function Asset(_ref) {
    var block = _ref.block,
        mapImageUrl = _ref.mapImageUrl;
    var value = block.value;
    var type = block.value.type;

    if (!types.includes(type)) {
        return null;
    }

    var format = value.format;

    var _ref2 = format !== null && format !== void 0 ? format : {},
        _ref2$display_source = _ref2.display_source,
        display_source = _ref2$display_source === void 0 ? undefined : _ref2$display_source,
        _ref2$block_aspect_ra = _ref2.block_aspect_ratio,
        block_aspect_ratio = _ref2$block_aspect_ra === void 0 ? undefined : _ref2$block_aspect_ra,
        _ref2$block_height = _ref2.block_height,
        block_height = _ref2$block_height === void 0 ? 1 : _ref2$block_height,
        _ref2$block_width = _ref2.block_width,
        block_width = _ref2$block_width === void 0 ? 1 : _ref2$block_width;

    var aspectRatio = block_aspect_ratio || block_height / block_width;

    if (type === "embed" || type === "video" || type === "figma") {
        return createElement("div", {
            style: {
                paddingBottom: aspectRatio * 100 + "%",
                position: "relative"
            }
        }, createElement("iframe", {
            className: "notion-image-inset",
            src: type === "figma" ? value.properties.source[0][0] : display_source
        }));
    }

    if (block.value.type === "image") {
        var _value$properties$cap;

        var src = mapImageUrl(value.properties.source[0][0], block);
        var caption = (_value$properties$cap = value.properties.caption) === null || _value$properties$cap === void 0 ? void 0 : _value$properties$cap[0][0];

        if (block_aspect_ratio) {
            return createElement("div", {
                style: {
                    paddingBottom: aspectRatio * 100 + "%",
                    position: "relative"
                }
            }, createElement("img", {
                className: "notion-image-inset",
                alt: caption || "notion image",
                src: src
            }));
        } else {
            return createElement("img", {
                alt: caption,
                src: src
            });
        }
    }

    return null;
};

var Code = function Code(_ref) {
    var code = _ref.code,
        _ref$language = _ref.language,
        language = _ref$language === void 0 ? "javascript" : _ref$language;
    var languageL = language.toLowerCase();
    var prismLanguage = languages[languageL] || languages.javascript;
    var langClass = "language-" + language.toLowerCase();
    return createElement("pre", {
        className: "notion-code " + langClass
    }, createElement("code", {
        className: langClass,
        dangerouslySetInnerHTML: {
            __html: highlight(code, prismLanguage, language)
        }
    }));
};

var classNames = function classNames() {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
    }

    return classes.filter(function (a) {
        return !!a;
    }).join(" ");
};
var getTextContent = function getTextContent(text) {
    return text.reduce(function (prev, current) {
        return prev + current[0];
    }, "");
};

var groupBlockContent = function groupBlockContent(blockMap) {
    var output = [];
    var lastType = undefined;
    var index = -1;
    Object.keys(blockMap).forEach(function (id) {
        var _blockMap$id$value$co;

        var block = blockMap[id];

        if (!block || typeof block !== 'object' || !block.value || !block.value.type) {
            console.warn('Invalid block:', id, block);
            return;
        }

        (_blockMap$id$value$co = block.value.content) === null || _blockMap$id$value$co === void 0 ? void 0 : _blockMap$id$value$co.forEach(function (blockId) {
            var _blockMap$blockId, _blockMap$blockId$val;

            var contentBlock = blockMap[blockId];
            if (!contentBlock || !contentBlock.value) {
                console.warn('Invalid content block:', blockId);
                return;
            }

            var blockType = (_blockMap$blockId = contentBlock) === null || _blockMap$blockId === void 0 ? void 0 : (_blockMap$blockId$val = _blockMap$blockId.value) === null || _blockMap$blockId$val === void 0 ? void 0 : _blockMap$blockId$val.type;

            if (blockType && blockType !== lastType) {
                index++;
                lastType = blockType;
                output[index] = [];
            }

            output[index].push(blockId);
        });
        lastType = undefined;
    });
    return output;
};

var getListNumber = function getListNumber(blockId, blockMap) {
    var groups = groupBlockContent(blockMap);
    var group = groups.find(function (g) {
        return g.includes(blockId);
    });

    if (!group) {
        return;
    }

    return group.indexOf(blockId) + 1;
};
var defaultMapImageUrl = function defaultMapImageUrl(image, block) {
    if (image === void 0) {
        image = "";
    }

    var url = new URL("https://www.notion.so" + (image.startsWith("/image") ? image : "/image/" + encodeURIComponent(image)));

    if (block && !image.includes("/images/page-cover/")) {
        var table = block.value.parent_table === "space" ? "block" : block.value.parent_table;
        url.searchParams.set("table", table);
        url.searchParams.set("id", block.value.id);
        url.searchParams.set("cache", "v2");
    }

    return url.toString();
};
var defaultMapPageUrl = function defaultMapPageUrl(pageId) {
    if (pageId === void 0) {
        pageId = "";
    }

    pageId = pageId.replace(/-/g, "");
    return "/" + pageId;
};

var isIconBlock = function isIconBlock(value) {
    return value.type === "page" || value.type === "callout";
};

var PageIcon = function PageIcon(_ref) {
    var _block$value$format, _block$value$properti;

    var block = _ref.block,
        className = _ref.className,
        big = _ref.big,
        mapImageUrl = _ref.mapImageUrl;

    if (!isIconBlock(block.value)) {
        return null;
    }

    var icon = (_block$value$format = block.value.format) === null || _block$value$format === void 0 ? void 0 : _block$value$format.page_icon;
    var title = (_block$value$properti = block.value.properties) === null || _block$value$properti === void 0 ? void 0 : _block$value$properti.title;

    if (icon === null || icon === void 0 ? void 0 : icon.includes("http")) {
        var url = mapImageUrl(icon, block);
        return createElement("img", {
            className: classNames(className, big ? "notion-page-icon-cover" : "notion-page-icon"),
            src: url,
            alt: title ? getTextContent(title) : "Icon"
        });
    } else {
        return createElement("span", {
            className: classNames(className, "notion-emoji", big ? "notion-page-icon-cover" : "notion-page-icon"),
            role: "img",
            "aria-label": icon
        }, icon);
    }
};

var PageHeader = function PageHeader(_ref) {
    var blockMap = _ref.blockMap,
        mapPageUrl = _ref.mapPageUrl,
        mapImageUrl = _ref.mapImageUrl;
    var blockIds = Object.keys(blockMap);
    var activePageId = blockIds[0];

    if (!activePageId) {
        return null;
    }

    var breadcrumbs = [];
    var currentPageId = activePageId;

    do {
        var _block$value$properti, _block$value$format;

        var block = blockMap[currentPageId];

        if (!block || !block.value) {
            break;
        }

        var title = (_block$value$properti = block.value.properties) === null || _block$value$properti === void 0 ? void 0 : _block$value$properti.title[0][0];
        var icon = (_block$value$format = block.value.format) === null || _block$value$format === void 0 ? void 0 : _block$value$format.page_icon;

        if (!(title || icon)) {
            break;
        }

        breadcrumbs.push({
            block: block,
            active: currentPageId === activePageId,
            pageId: currentPageId,
            title: title,
            icon: icon
        });
        var parentId = block.value.parent_id;

        if (!parentId) {
            break;
        }

        currentPageId = parentId;
    } while (true);

    breadcrumbs.reverse();
    return createElement("header", {
        className: "notion-page-header"
    }, createElement("div", {
        className: "notion-nav-breadcrumbs"
    }, breadcrumbs.map(function (breadcrumb, index) {
        return createElement(Fragment, {
            key: breadcrumb.pageId
        }, createElement("a", {
            className: "notion-nav-breadcrumb " + (breadcrumb.active ? "notion-nav-breadcrumb-active" : ""),
            href: breadcrumb.active ? undefined : mapPageUrl(breadcrumb.pageId)
        }, breadcrumb.icon && createElement(PageIcon, {
            className: "notion-nav-icon",
            block: breadcrumb.block,
            mapImageUrl: mapImageUrl
        }), breadcrumb.title && createElement("span", {
            className: "notion-nav-title"
        }, breadcrumb.title)), index < breadcrumbs.length - 1 && createElement("span", {
            className: "notion-nav-spacer"
        }, "/"));
    })));
};

var createRenderChildText = function createRenderChildText(customDecoratorComponents) {
    return function (properties) {
        return properties === null || properties === void 0 ? void 0 : properties.map(function (_ref, i) {
            var text = _ref[0],
                decorations = _ref[1];

            if (!decorations) {
                return createElement(Fragment, {
                    key: i
                }, text);
            }

            return decorations.reduceRight(function (element, decorator) {
                var renderText = function renderText() {
                    switch (decorator[0]) {
                        case "h":
                            return createElement("span", {
                                key: i,
                                className: "notion-" + decorator[1]
                            }, element);

                        case "c":
                            return createElement("code", {
                                key: i,
                                className: "notion-inline-code"
                            }, element);

                        case "b":
                            return createElement("b", {
                                key: i
                            }, element);

                        case "i":
                            return createElement("em", {
                                key: i
                            }, element);

                        case "s":
                            return createElement("s", {
                                key: i
                            }, element);

                        case "a":
                            return createElement("a", {
                                className: "notion-link",
                                href: decorator[1],
                                key: i
                            }, element);

                        default:
                            return createElement(Fragment, {
                                key: i
                            }, element);
                    }
                };

                var CustomComponent = customDecoratorComponents === null || customDecoratorComponents === void 0 ? void 0 : customDecoratorComponents[decorator[0]];

                if (CustomComponent) {
                    var props = decorator[1] ? {
                        decoratorValue: decorator[1]
                    } : {};
                    return createElement(CustomComponent, Object.assign({
                        key: i
                    }, props, {
                        renderComponent: renderText
                    }), text);
                }

                return renderText();
            }, createElement(Fragment, null, text));
        });
    };
};
var Block = function Block(props) {
    var block = props.block,
        children = props.children,
        level = props.level,
        fullPage = props.fullPage,
        hideHeader = props.hideHeader,
        blockMap = props.blockMap,
        mapPageUrl = props.mapPageUrl,
        mapImageUrl = props.mapImageUrl,
        customBlockComponents = props.customBlockComponents,
        customDecoratorComponents = props.customDecoratorComponents;
    var blockValue = block === null || block === void 0 ? void 0 : block.value;

    var renderComponent = function renderComponent() {
        var _blockValue$format, _block$collection, _block$collection2, _collectionView$forma, _collectionView$forma2, _block$collection4, _block$collection6, _blockValue$propertie, _blockValue$format2, _blockValue$format3, _blockValue$format4;

        var renderChildText = createRenderChildText(customDecoratorComponents);

        switch (blockValue === null || blockValue === void 0 ? void 0 : blockValue.type) {
            case "page":
                if (level === 0) {
                    if (fullPage) {
                        if (!blockValue.properties) {
                            return null;
                        }

                        var _ref2 = blockValue.format || {},
                            page_icon = _ref2.page_icon,
                            page_cover = _ref2.page_cover,
                            page_cover_position = _ref2.page_cover_position,
                            page_full_width = _ref2.page_full_width,
                            page_small_text = _ref2.page_small_text;

                        var coverPosition = (1 - (page_cover_position || 0.5)) * 100;
                        return createElement("div", {
                            className: "notion"
                        }, !hideHeader && createElement(PageHeader, {
                            blockMap: blockMap,
                            mapPageUrl: mapPageUrl,
                            mapImageUrl: mapImageUrl
                        }), page_cover && createElement("img", {
                            src: mapImageUrl(page_cover, block),
                            alt: getTextContent(blockValue.properties.title),
                            className: "notion-page-cover",
                            style: {
                                objectPosition: "center " + coverPosition + "%"
                            }
                        }), createElement("main", {
                            className: classNames("notion-page", !page_cover && "notion-page-offset", page_full_width && "notion-full-width", page_small_text && "notion-small-text")
                        }, page_icon && createElement(PageIcon, {
                            className: page_cover ? "notion-page-icon-offset" : undefined,
                            block: block,
                            big: true,
                            mapImageUrl: mapImageUrl
                        }), createElement("div", {
                            className: "notion-title"
                        }, renderChildText(blockValue.properties.title)), children));
                    } else {
                        return createElement("main", {
                            className: "notion"
                        }, children);
                    }
                } else {
                    if (!blockValue.properties) return null;
                    return createElement("a", {
                        className: "notion-page-link",
                        href: mapPageUrl(blockValue.id)
                    }, blockValue.format && createElement("div", {
                        className: "notion-page-icon"
                    }, createElement(PageIcon, {
                        block: block,
                        mapImageUrl: mapImageUrl
                    })), createElement("div", {
                        className: "notion-page-text"
                    }, renderChildText(blockValue.properties.title)));
                }

            case "header":
                if (!blockValue.properties) return null;
                return createElement("h1", {
                    className: "notion-h1"
                }, renderChildText(blockValue.properties.title));

            case "sub_header":
                if (!blockValue.properties) return null;
                return createElement("h2", {
                    className: "notion-h2"
                }, renderChildText(blockValue.properties.title));

            case "sub_sub_header":
                if (!blockValue.properties) return null;
                return createElement("h3", {
                    className: "notion-h3"
                }, renderChildText(blockValue.properties.title));

            case "divider":
                return createElement("hr", {
                    className: "notion-hr"
                });

            case "text":
                if (!blockValue.properties) {
                    return createElement("div", {
                        className: "notion-blank"
                    }, "\xA0");
                }

                var blockColor = (_blockValue$format = blockValue.format) === null || _blockValue$format === void 0 ? void 0 : _blockValue$format.block_color;
                return createElement("p", {
                    className: classNames("notion-text", blockColor && "notion-" + blockColor)
                }, renderChildText(blockValue.properties.title));

            case "bulleted_list":
            case "numbered_list":
                var wrapList = function wrapList(content, start) {
                    return blockValue.type === "bulleted_list" ? createElement("ul", {
                        className: "notion-list notion-list-disc"
                    }, content) : createElement("ol", {
                        start: start,
                        className: "notion-list notion-list-numbered"
                    }, content);
                };

                var output = null;

                if (blockValue.content) {
                    output = createElement(Fragment, null, blockValue.properties && createElement("li", null, renderChildText(blockValue.properties.title)), wrapList(children));
                } else {
                    output = blockValue.properties ? createElement("li", null, renderChildText(blockValue.properties.title)) : null;
                }

                var isTopLevel = block.value.type !== blockMap[block.value.parent_id].value.type;
                var start = getListNumber(blockValue.id, blockMap);
                return isTopLevel ? wrapList(output, start) : output;

            case "image":
            case "embed":
            case "figma":
            case "video":
                var value = block.value;
                return createElement("figure", {
                    className: "notion-asset-wrapper",
                    style: value.format !== undefined ? {
                        width: value.format.block_width
                    } : undefined
                }, createElement(Asset, {
                    block: block,
                    mapImageUrl: mapImageUrl
                }), value.properties.caption && createElement("figcaption", {
                    className: "notion-image-caption"
                }, renderChildText(value.properties.caption)));

            case "code":
                {
                    if (blockValue.properties.title) {
                        var content = blockValue.properties.title[0][0];
                        var language = blockValue.properties.language[0][0];
                        return createElement(Code, {
                            key: blockValue.id,
                            language: language || "",
                            code: content
                        });
                    }

                    break;
                }

            case "column_list":
                return createElement("div", {
                    className: "notion-row"
                }, children);

            case "column":
                var spacerWith = 46;
                var ratio = blockValue.format.column_ratio;
                var columns = Number((1 / ratio).toFixed(0));
                var spacerTotalWith = (columns - 1) * spacerWith;
                var width = "calc((100% - " + spacerTotalWith + "px) * " + ratio + ")";
                return createElement(Fragment, null, createElement("div", {
                    className: "notion-column",
                    style: {
                        width: width
                    }
                }, children), createElement("div", {
                    className: "notion-spacer",
                    style: {
                        width: spacerWith
                    }
                }));

            case "quote":
                if (!blockValue.properties) return null;
                return createElement("blockquote", {
                    className: "notion-quote"
                }, renderChildText(blockValue.properties.title));

            case "collection_view":
                if (!block) return null;
                var collectionView = block === null || block === void 0 ? void 0 : (_block$collection = block.collection) === null || _block$collection === void 0 ? void 0 : _block$collection.types[0];
                return createElement("div", null, createElement("h3", {
                    className: "notion-h3"
                }, renderChildText((_block$collection2 = block.collection) === null || _block$collection2 === void 0 ? void 0 : _block$collection2.title)), (collectionView === null || collectionView === void 0 ? void 0 : collectionView.type) === "table" && createElement("div", {
                    style: {
                        maxWidth: "100%",
                        marginTop: 5
                    }
                }, createElement("table", {
                    className: "notion-table"
                }, createElement("thead", null, createElement("tr", {
                    className: "notion-tr"
                }, (_collectionView$forma = collectionView.format) === null || _collectionView$forma === void 0 ? void 0 : (_collectionView$forma2 = _collectionView$forma.table_properties) === null || _collectionView$forma2 === void 0 ? void 0 : _collectionView$forma2.filter(function (p) {
                    return p.visible;
                }).map(function (gp, index) {
                    var _block$collection3, _block$collection3$sc;

                    return createElement("th", {
                        className: "notion-th",
                        key: index,
                        style: {
                            minWidth: gp.width
                        }
                    }, (_block$collection3 = block.collection) === null || _block$collection3 === void 0 ? void 0 : (_block$collection3$sc = _block$collection3.schema[gp.property]) === null || _block$collection3$sc === void 0 ? void 0 : _block$collection3$sc.name);
                }))), createElement("tbody", null, block === null || block === void 0 ? void 0 : (_block$collection4 = block.collection) === null || _block$collection4 === void 0 ? void 0 : _block$collection4.data.map(function (row, index) {
                    var _collectionView$forma3, _collectionView$forma4;

                    return createElement("tr", {
                        className: "notion-tr",
                        key: index
                    }, (_collectionView$forma3 = collectionView.format) === null || _collectionView$forma3 === void 0 ? void 0 : (_collectionView$forma4 = _collectionView$forma3.table_properties) === null || _collectionView$forma4 === void 0 ? void 0 : _collectionView$forma4.filter(function (p) {
                        return p.visible;
                    }).map(function (gp, index) {
                        var _block$collection5, _block$collection5$sc;

                        return createElement("td", {
                            key: index,
                            className: "notion-td " + (gp.property === "title" ? "notion-bold" : "")
                        }, renderChildText(row[(_block$collection5 = block.collection) === null || _block$collection5 === void 0 ? void 0 : (_block$collection5$sc = _block$collection5.schema[gp.property]) === null || _block$collection5$sc === void 0 ? void 0 : _block$collection5$sc.name]));
                    }));
                })))), (collectionView === null || collectionView === void 0 ? void 0 : collectionView.type) === "gallery" && createElement("div", {
                    className: "notion-gallery"
                }, (_block$collection6 = block.collection) === null || _block$collection6 === void 0 ? void 0 : _block$collection6.data.map(function (row, i) {
                    var _collectionView$forma5, _collectionView$forma6;

                    return createElement("div", {
                        key: "col-" + i,
                        className: "notion-gallery-card"
                    }, createElement("div", {
                        className: "notion-gallery-content"
                    }, (_collectionView$forma5 = collectionView.format) === null || _collectionView$forma5 === void 0 ? void 0 : (_collectionView$forma6 = _collectionView$forma5.gallery_properties) === null || _collectionView$forma6 === void 0 ? void 0 : _collectionView$forma6.filter(function (p) {
                        return p.visible;
                    }).map(function (gp, idx) {
                        var _block$collection7;

                        return createElement("p", {
                            key: idx + "item",
                            className: "notion-gallery-data " + (idx === 0 ? "is-first" : "")
                        }, getTextContent(row[(_block$collection7 = block.collection) === null || _block$collection7 === void 0 ? void 0 : _block$collection7.schema[gp.property].name]));
                    })));
                })));

            case "callout":
                return createElement("div", {
                    className: classNames("notion-callout", blockValue.format.block_color && "notion-" + blockValue.format.block_color, blockValue.format.block_color && "notion-" + blockValue.format.block_color + "_co")
                }, createElement("div", null, createElement(PageIcon, {
                    block: block,
                    mapImageUrl: mapImageUrl
                })), createElement("div", {
                    className: "notion-callout-text"
                }, renderChildText(blockValue.properties.title)));

            case "bookmark":
                var link = blockValue.properties.link;
                var title = (_blockValue$propertie = blockValue.properties.title) !== null && _blockValue$propertie !== void 0 ? _blockValue$propertie : link;
                var description = blockValue.properties.description;
                var block_color = (_blockValue$format2 = blockValue.format) === null || _blockValue$format2 === void 0 ? void 0 : _blockValue$format2.block_color;
                var bookmark_icon = (_blockValue$format3 = blockValue.format) === null || _blockValue$format3 === void 0 ? void 0 : _blockValue$format3.bookmark_icon;
                var bookmark_cover = (_blockValue$format4 = blockValue.format) === null || _blockValue$format4 === void 0 ? void 0 : _blockValue$format4.bookmark_cover;
                return createElement("div", {
                    className: "notion-row"
                }, createElement("a", {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: classNames("notion-bookmark", block_color && "notion-" + block_color),
                    href: link[0][0]
                }, createElement("div", null, createElement("div", {
                    className: "notion-bookmark-title"
                }, renderChildText(title)), description && createElement("div", {
                    className: "notion-bookmark-description"
                }, renderChildText(description)), createElement("div", {
                    className: "notion-bookmark-link"
                }, bookmark_icon && createElement("img", {
                    src: bookmark_icon,
                    alt: getTextContent(title)
                }), createElement("div", null, renderChildText(link)))), bookmark_cover && createElement("div", {
                    className: "notion-bookmark-image"
                }, createElement("img", {
                    src: bookmark_cover,
                    alt: getTextContent(title)
                }))));

            case "toggle":
                return createElement("div", {
                    className: "notion-toggle"
                }, createElement("div", {
                    className: "notion-toggle-title",
                    onClick: (e) => {
                        e.currentTarget.parentElement.classList.toggle("notion-toggle-open");
                    }
                }, renderChildText(blockValue.properties.title)), createElement("div", {
                    className: "notion-toggle-content"
                }, children));

            default:
                if (process.env.NODE_ENV !== "production") {
                    var _block$value;

                    console.log("Unsupported type " + (block === null || block === void 0 ? void 0 : (_block$value = block.value) === null || _block$value === void 0 ? void 0 : _block$value.type));
                }

                return createElement("div", null);
        }

        return null;
    }; // render a custom component first if passed.


    if (customBlockComponents && customBlockComponents[blockValue === null || blockValue === void 0 ? void 0 : blockValue.type] && // Do not use custom component for base page block
        level !== 0) {
        var CustomComponent = customBlockComponents[blockValue === null || blockValue === void 0 ? void 0 : blockValue.type];
        return createElement(CustomComponent, {
            renderComponent: renderComponent,
            blockMap: blockMap,
            blockValue: blockValue,
            level: level
        }, children);
    }

    return renderComponent();
};

var NotionRenderer = function NotionRenderer(_ref) {
    var _currentBlock$value, _currentBlock$value$c;

    var _ref$level = _ref.level,
        level = _ref$level === void 0 ? 0 : _ref$level,
        currentId = _ref.currentId,
        _ref$mapPageUrl = _ref.mapPageUrl,
        mapPageUrl = _ref$mapPageUrl === void 0 ? defaultMapPageUrl : _ref$mapPageUrl,
        _ref$mapImageUrl = _ref.mapImageUrl,
        mapImageUrl = _ref$mapImageUrl === void 0 ? defaultMapImageUrl : _ref$mapImageUrl,
        props = _objectWithoutPropertiesLoose(_ref, ["level", "currentId", "mapPageUrl", "mapImageUrl"]);

    var blockMap = props.blockMap;
    var id = currentId || Object.keys(blockMap)[0];
    var currentBlock = blockMap[id];

    if (!currentBlock) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("error rendering block", currentId);
        }

        return null;
    }

    return React__default.createElement(Block, Object.assign({
        key: id,
        level: level,
        block: currentBlock,
        mapPageUrl: mapPageUrl,
        mapImageUrl: mapImageUrl
    }, props), currentBlock === null || currentBlock === void 0 ? void 0 : (_currentBlock$value = currentBlock.value) === null || _currentBlock$value === void 0 ? void 0 : (_currentBlock$value$c = _currentBlock$value.content) === null || _currentBlock$value$c === void 0 ? void 0 : _currentBlock$value$c.map(function (contentId) {
        return React__default.createElement(NotionRenderer, Object.assign({
            key: contentId,
            currentId: contentId,
            level: level + 1,
            mapPageUrl: mapPageUrl,
            mapImageUrl: mapImageUrl
        }, props));
    }));
};

export { Block, NotionRenderer, classNames, createRenderChildText, defaultMapImageUrl, defaultMapPageUrl, getListNumber, getTextContent };
//# sourceMappingURL=react-notion.esm.js.map