/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/host/src/reflection", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An enumeration of possible kinds of class members.
     */
    var ClassMemberKind;
    (function (ClassMemberKind) {
        ClassMemberKind[ClassMemberKind["Constructor"] = 0] = "Constructor";
        ClassMemberKind[ClassMemberKind["Getter"] = 1] = "Getter";
        ClassMemberKind[ClassMemberKind["Setter"] = 2] = "Setter";
        ClassMemberKind[ClassMemberKind["Property"] = 3] = "Property";
        ClassMemberKind[ClassMemberKind["Method"] = 4] = "Method";
    })(ClassMemberKind = exports.ClassMemberKind || (exports.ClassMemberKind = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvaG9zdC9zcmMvcmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQWlDSDs7T0FFRztJQUNILElBQVksZUFNWDtJQU5ELFdBQVksZUFBZTtRQUN6QixtRUFBVyxDQUFBO1FBQ1gseURBQU0sQ0FBQTtRQUNOLHlEQUFNLENBQUE7UUFDTiw2REFBUSxDQUFBO1FBQ1IseURBQU0sQ0FBQTtJQUNSLENBQUMsRUFOVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQU0xQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbi8qKlxuICogTWV0YWRhdGEgZXh0cmFjdGVkIGZyb20gYW4gaW5zdGFuY2Ugb2YgYSBkZWNvcmF0b3Igb24gYW5vdGhlciBkZWNsYXJhdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWNvcmF0b3Ige1xuICAvKipcbiAgICogTmFtZSBieSB3aGljaCB0aGUgZGVjb3JhdG9yIHdhcyBpbnZva2VkIGluIHRoZSB1c2VyJ3MgY29kZS5cbiAgICpcbiAgICogVGhpcyBpcyBkaXN0aW5jdCBmcm9tIHRoZSBuYW1lIGJ5IHdoaWNoIHRoZSBkZWNvcmF0b3Igd2FzIGltcG9ydGVkICh0aG91Z2ggaW4gcHJhY3RpY2UgdGhleVxuICAgKiB3aWxsIHVzdWFsbHkgYmUgdGhlIHNhbWUpLlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBgSW1wb3J0YCBieSB3aGljaCB0aGUgZGVjb3JhdG9yIHdhcyBicm91Z2h0IGludG8gdGhlIG1vZHVsZSBpbiB3aGljaCBpdCB3YXMgaW52b2tlZCwgb3IgYG51bGxgXG4gICAqIGlmIHRoZSBkZWNvcmF0b3Igd2FzIGRlY2xhcmVkIGluIHRoZSBzYW1lIG1vZHVsZSBhbmQgbm90IGltcG9ydGVkLlxuICAgKi9cbiAgaW1wb3J0IDogSW1wb3J0IHwgbnVsbDtcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCByZWZlcmVuY2UgdG8gdGhlIGRlY29yYXRvciBpdHNlbGYuXG4gICAqL1xuICBub2RlOiB0cy5Ob2RlO1xuXG4gIC8qKlxuICAgKiBBcmd1bWVudHMgb2YgdGhlIGludm9jYXRpb24gb2YgdGhlIGRlY29yYXRvciwgaWYgdGhlIGRlY29yYXRvciBpcyBpbnZva2VkLCBvciBgbnVsbGAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgYXJnczogdHMuRXhwcmVzc2lvbltdfG51bGw7XG59XG5cbi8qKlxuICogQW4gZW51bWVyYXRpb24gb2YgcG9zc2libGUga2luZHMgb2YgY2xhc3MgbWVtYmVycy5cbiAqL1xuZXhwb3J0IGVudW0gQ2xhc3NNZW1iZXJLaW5kIHtcbiAgQ29uc3RydWN0b3IsXG4gIEdldHRlcixcbiAgU2V0dGVyLFxuICBQcm9wZXJ0eSxcbiAgTWV0aG9kLFxufVxuXG4vKipcbiAqIEEgbWVtYmVyIG9mIGEgY2xhc3MsIHN1Y2ggYXMgYSBwcm9wZXJ0eSwgbWV0aG9kLCBvciBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDbGFzc01lbWJlciB7XG4gIC8qKlxuICAgKiBUeXBlU2NyaXB0IHJlZmVyZW5jZSB0byB0aGUgY2xhc3MgbWVtYmVyIGl0c2VsZi5cbiAgICovXG4gIG5vZGU6IHRzLk5vZGU7XG5cbiAgLyoqXG4gICAqIEluZGljYXRpb24gb2Ygd2hpY2ggdHlwZSBvZiBtZW1iZXIgdGhpcyBpcyAocHJvcGVydHksIG1ldGhvZCwgZXRjKS5cbiAgICovXG4gIGtpbmQ6IENsYXNzTWVtYmVyS2luZDtcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBgdHMuVHlwZU5vZGVgIHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiB0aGUgbWVtYmVyLCBvciBgbnVsbGAgaWYgbm90IHByZXNlbnQgb3JcbiAgICogYXBwbGljYWJsZS5cbiAgICovXG4gIHR5cGU6IHRzLlR5cGVOb2RlfG51bGw7XG5cbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGNsYXNzIG1lbWJlci5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBgdHMuSWRlbnRpZmllcmAgcmVwcmVzZW50aW5nIHRoZSBuYW1lIG9mIHRoZSBtZW1iZXIsIG9yIGBudWxsYCBpZiBubyBzdWNoIG5vZGVcbiAgICogaXMgcHJlc2VudC5cbiAgICpcbiAgICogVGhlIGBuYW1lTm9kZWAgaXMgdXNlZnVsIGluIHdyaXRpbmcgcmVmZXJlbmNlcyB0byB0aGlzIG1lbWJlciB0aGF0IHdpbGwgYmUgY29ycmVjdGx5IHNvdXJjZS1cbiAgICogbWFwcGVkIGJhY2sgdG8gdGhlIG9yaWdpbmFsIGZpbGUuXG4gICAqL1xuICBuYW1lTm9kZTogdHMuSWRlbnRpZmllcnxudWxsO1xuXG4gIC8qKlxuICAgKiBUeXBlU2NyaXB0IGB0cy5FeHByZXNzaW9uYCB3aGljaCByZXByZXNlbnRzIHRoZSB2YWx1ZSBvZiB0aGUgbWVtYmVyLlxuICAgKlxuICAgKiBJZiB0aGUgbWVtYmVyIGlzIGEgcHJvcGVydHksIHRoaXMgd2lsbCBiZSB0aGUgcHJvcGVydHkgaW5pdGlhbGl6ZXIgaWYgdGhlcmUgaXMgb25lLCBvciBudWxsXG4gICAqIG90aGVyd2lzZS5cbiAgICovXG4gIHZhbHVlOiB0cy5FeHByZXNzaW9ufG51bGw7XG5cbiAgLyoqXG4gICAqIFR5cGVTY3JpcHQgYHRzLkRlY2xhcmF0aW9uYCB3aGljaCByZXByZXNlbnRzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbWVtYmVyLlxuICAgKlxuICAgKiBJbiBUeXBlU2NyaXB0IGNvZGUgdGhpcyBpcyBpZGVudGljYWwgdG8gdGhlIG5vZGUsIGJ1dCBpbiBkb3dubGV2ZWxlZCBjb2RlIHRoaXMgc2hvdWxkIGFsd2F5cyBiZVxuICAgKiB0aGUgRGVjbGFyYXRpb24gd2hpY2ggYWN0dWFsbHkgcmVwcmVzZW50cyB0aGUgbWVtYmVyJ3MgcnVudGltZSB2YWx1ZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHRoZSBUUyBjb2RlOlxuICAgKlxuICAgKiBgYGBcbiAgICogY2xhc3MgQ2xhenoge1xuICAgKiAgIHN0YXRpYyBnZXQgcHJvcGVydHkoKTogc3RyaW5nIHtcbiAgICogICAgIHJldHVybiAndmFsdWUnO1xuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogRG93bmxldmVscyB0bzpcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBDbGF6eiA9IChmdW5jdGlvbiAoKSB7XG4gICAqICAgZnVuY3Rpb24gQ2xhenooKSB7XG4gICAqICAgfVxuICAgKiAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGF6eiwgXCJwcm9wZXJ0eVwiLCB7XG4gICAqICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgKiAgICAgICAgICAgcmV0dXJuICd2YWx1ZSc7XG4gICAqICAgICAgIH0sXG4gICAqICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAqICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgKiAgIH0pO1xuICAgKiAgIHJldHVybiBDbGF6ejtcbiAgICogfSgpKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEluIHRoaXMgZXhhbXBsZSwgZm9yIHRoZSBwcm9wZXJ0eSBcInByb3BlcnR5XCIsIHRoZSBub2RlIHdvdWxkIGJlIHRoZSBlbnRpcmVcbiAgICogT2JqZWN0LmRlZmluZVByb3BlcnR5IEV4cHJlc3Npb25TdGF0ZW1lbnQsIGJ1dCB0aGUgaW1wbGVtZW50YXRpb24gd291bGQgYmUgdGhpc1xuICAgKiBGdW5jdGlvbkRlY2xhcmF0aW9uOlxuICAgKlxuICAgKiBgYGBcbiAgICogZnVuY3Rpb24gKCkge1xuICAgKiAgIHJldHVybiAndmFsdWUnO1xuICAgKiB9LFxuICAgKiBgYGBcbiAgICovXG4gIGltcGxlbWVudGF0aW9uOiB0cy5EZWNsYXJhdGlvbnxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBtZW1iZXIgaXMgc3RhdGljIG9yIG5vdC5cbiAgICovXG4gIGlzU3RhdGljOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbnkgYERlY29yYXRvcmBzIHdoaWNoIGFyZSBwcmVzZW50IG9uIHRoZSBtZW1iZXIsIG9yIGBudWxsYCBpZiBub25lIGFyZSBwcmVzZW50LlxuICAgKi9cbiAgZGVjb3JhdG9yczogRGVjb3JhdG9yW118bnVsbDtcbn1cblxuLyoqXG4gKiBBIHBhcmFtZXRlciB0byBhIGZ1bmN0aW9uIG9yIGNvbnN0cnVjdG9yLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBhcmFtZXRlciB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBwYXJhbWV0ZXIsIGlmIGF2YWlsYWJsZS5cbiAgICpcbiAgICogU29tZSBwYXJhbWV0ZXJzIGRvbid0IGhhdmUgYSBzaW1wbGUgc3RyaW5nIG5hbWUgKGZvciBleGFtcGxlLCBwYXJhbWV0ZXJzIHdoaWNoIGFyZSBkZXN0cnVjdHVyZWRcbiAgICogaW50byBtdWx0aXBsZSB2YXJpYWJsZXMpLiBJbiB0aGVzZSBjYXNlcywgYG5hbWVgIGNhbiBiZSBgbnVsbGAuXG4gICAqL1xuICBuYW1lOiBzdHJpbmd8bnVsbDtcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBgdHMuQmluZGluZ05hbWVgIHJlcHJlc2VudGluZyB0aGUgbmFtZSBvZiB0aGUgcGFyYW1ldGVyLlxuICAgKlxuICAgKiBUaGUgYG5hbWVOb2RlYCBpcyB1c2VmdWwgaW4gd3JpdGluZyByZWZlcmVuY2VzIHRvIHRoaXMgbWVtYmVyIHRoYXQgd2lsbCBiZSBjb3JyZWN0bHkgc291cmNlLVxuICAgKiBtYXBwZWQgYmFjayB0byB0aGUgb3JpZ2luYWwgZmlsZS5cbiAgICovXG4gIG5hbWVOb2RlOiB0cy5CaW5kaW5nTmFtZTtcblxuICAvKipcbiAgICogVHlwZVNjcmlwdCBgdHMuRXhwcmVzc2lvbmAgcmVwcmVzZW50aW5nIHRoZSB0eXBlIG9mIHRoZSBwYXJhbWV0ZXIsIGlmIHRoZSB0eXBlIGlzIGEgc2ltcGxlXG4gICAqIGV4cHJlc3Npb24gdHlwZS5cbiAgICpcbiAgICogSWYgdGhlIHR5cGUgaXMgbm90IHByZXNlbnQgb3IgY2Fubm90IGJlIHJlcHJlc2VudGVkIGFzIGFuIGV4cHJlc3Npb24sIGB0eXBlYCBpcyBgbnVsbGAuXG4gICAqL1xuICB0eXBlOiB0cy5FeHByZXNzaW9ufG51bGw7XG5cbiAgLyoqXG4gICAqIEFueSBgRGVjb3JhdG9yYHMgd2hpY2ggYXJlIHByZXNlbnQgb24gdGhlIHBhcmFtZXRlciwgb3IgYG51bGxgIGlmIG5vbmUgYXJlIHByZXNlbnQuXG4gICAqL1xuICBkZWNvcmF0b3JzOiBEZWNvcmF0b3JbXXxudWxsO1xufVxuXG4vKipcbiAqIFRoZSBzb3VyY2Ugb2YgYW4gaW1wb3J0ZWQgc3ltYm9sLCBpbmNsdWRpbmcgdGhlIG9yaWdpbmFsIHN5bWJvbCBuYW1lIGFuZCB0aGUgbW9kdWxlIGZyb20gd2hpY2ggaXRcbiAqIHdhcyBpbXBvcnRlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbXBvcnQge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGltcG9ydGVkIHN5bWJvbCB1bmRlciB3aGljaCBpdCB3YXMgZXhwb3J0ZWQgKG5vdCBpbXBvcnRlZCkuXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBtb2R1bGUgZnJvbSB3aGljaCB0aGUgc3ltYm9sIHdhcyBpbXBvcnRlZC5cbiAgICpcbiAgICogVGhpcyBjb3VsZCBlaXRoZXIgYmUgYW4gYWJzb2x1dGUgbW9kdWxlIG5hbWUgKEBhbmd1bGFyL2NvcmUgZm9yIGV4YW1wbGUpIG9yIGEgcmVsYXRpdmUgcGF0aC5cbiAgICovXG4gIGZyb206IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgZGVjbGFyYXRpb24gb2YgYSBzeW1ib2wsIGFsb25nIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgaG93IGl0IHdhcyBpbXBvcnRlZCBpbnRvIHRoZVxuICogYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjbGFyYXRpb24ge1xuICAvKipcbiAgICogVHlwZVNjcmlwdCByZWZlcmVuY2UgdG8gdGhlIGRlY2xhcmF0aW9uIGl0c2VsZi5cbiAgICovXG4gIG5vZGU6IHRzLkRlY2xhcmF0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgYWJzb2x1dGUgbW9kdWxlIHBhdGggZnJvbSB3aGljaCB0aGUgc3ltYm9sIHdhcyBpbXBvcnRlZCBpbnRvIHRoZSBhcHBsaWNhdGlvbiwgaWYgdGhlIHN5bWJvbFxuICAgKiB3YXMgaW1wb3J0ZWQgdmlhIGFuIGFic29sdXRlIG1vZHVsZSAoZXZlbiB0aHJvdWdoIGEgY2hhaW4gb2YgcmUtZXhwb3J0cykuIElmIHRoZSBzeW1ib2wgaXMgcGFydFxuICAgKiBvZiB0aGUgYXBwbGljYXRpb24gYW5kIHdhcyBub3QgaW1wb3J0ZWQgZnJvbSBhbiBhYnNvbHV0ZSBwYXRoLCB0aGlzIHdpbGwgYmUgYG51bGxgLlxuICAgKi9cbiAgdmlhTW9kdWxlOiBzdHJpbmd8bnVsbDtcbn1cblxuLyoqXG4gKiBBYnN0cmFjdHMgcmVmbGVjdGlvbiBvcGVyYXRpb25zIG9uIGEgVHlwZVNjcmlwdCBBU1QuXG4gKlxuICogRGVwZW5kaW5nIG9uIHRoZSBmb3JtYXQgb2YgdGhlIGNvZGUgYmVpbmcgaW50ZXJwcmV0ZWQsIGRpZmZlcmVudCBjb25jZXB0cyBhcmUgcmVwcmVzZW50ZWQgd2l0aFxuICogZGlmZmVyZW50IHN5bnRhY3RpY2FsIHN0cnVjdHVyZXMuIFRoZSBgUmVmbGVjdGlvbkhvc3RgIGFic3RyYWN0cyBvdmVyIHRob3NlIGRpZmZlcmVuY2VzIGFuZFxuICogcHJlc2VudHMgYSBzaW5nbGUgQVBJIGJ5IHdoaWNoIHRoZSBjb21waWxlciBjYW4gcXVlcnkgc3BlY2lmaWMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIEFTVC5cbiAqXG4gKiBBbGwgb3BlcmF0aW9ucyBvbiB0aGUgYFJlZmxlY3Rpb25Ib3N0YCByZXF1aXJlIHRoZSB1c2Ugb2YgVHlwZVNjcmlwdCBgdHMuTm9kZWBzIHdpdGggYmluZGluZ1xuICogaW5mb3JtYXRpb24gYWxyZWFkeSBhdmFpbGFibGUgKHRoYXQgaXMsIG5vZGVzIHRoYXQgY29tZSBmcm9tIGEgYHRzLlByb2dyYW1gIHRoYXQgaGFzIGJlZW5cbiAqIHR5cGUtY2hlY2tlZCwgYW5kIGFyZSBub3Qgc3ludGhldGljYWxseSBjcmVhdGVkKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWZsZWN0aW9uSG9zdCB7XG4gIC8qKlxuICAgKiBFeGFtaW5lIGEgZGVjbGFyYXRpb24gKGZvciBleGFtcGxlLCBvZiBhIGNsYXNzIG9yIGZ1bmN0aW9uKSBhbmQgcmV0dXJuIG1ldGFkYXRhIGFib3V0IGFueVxuICAgKiBkZWNvcmF0b3JzIHByZXNlbnQgb24gdGhlIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZGVjbGFyYXRpb24gYSBUeXBlU2NyaXB0IGB0cy5EZWNsYXJhdGlvbmAgbm9kZSByZXByZXNlbnRpbmcgdGhlIGNsYXNzIG9yIGZ1bmN0aW9uIG92ZXJcbiAgICogd2hpY2ggdG8gcmVmbGVjdC4gRm9yIGV4YW1wbGUsIGlmIHRoZSBpbnRlbnQgaXMgdG8gcmVmbGVjdCB0aGUgZGVjb3JhdG9ycyBvZiBhIGNsYXNzIGFuZCB0aGVcbiAgICogc291cmNlIGlzIGluIEVTNiBmb3JtYXQsIHRoaXMgd2lsbCBiZSBhIGB0cy5DbGFzc0RlY2xhcmF0aW9uYCBub2RlLiBJZiB0aGUgc291cmNlIGlzIGluIEVTNVxuICAgKiBmb3JtYXQsIHRoaXMgbWlnaHQgYmUgYSBgdHMuVmFyaWFibGVEZWNsYXJhdGlvbmAgYXMgY2xhc3NlcyBpbiBFUzUgYXJlIHJlcHJlc2VudGVkIGFzIHRoZVxuICAgKiByZXN1bHQgb2YgYW4gSUlGRSBleGVjdXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIGFycmF5IG9mIGBEZWNvcmF0b3JgIG1ldGFkYXRhIGlmIGRlY29yYXRvcnMgYXJlIHByZXNlbnQgb24gdGhlIGRlY2xhcmF0aW9uLCBvclxuICAgKiBgbnVsbGAgaWYgZWl0aGVyIG5vIGRlY29yYXRvcnMgd2VyZSBwcmVzZW50IG9yIGlmIHRoZSBkZWNsYXJhdGlvbiBpcyBub3Qgb2YgYSBkZWNvcmFibGUgdHlwZS5cbiAgICovXG4gIGdldERlY29yYXRvcnNPZkRlY2xhcmF0aW9uKGRlY2xhcmF0aW9uOiB0cy5EZWNsYXJhdGlvbik6IERlY29yYXRvcltdfG51bGw7XG5cbiAgLyoqXG4gICAqIEV4YW1pbmUgYSBkZWNsYXJhdGlvbiB3aGljaCBzaG91bGQgYmUgb2YgYSBjbGFzcywgYW5kIHJldHVybiBtZXRhZGF0YSBhYm91dCB0aGUgbWVtYmVycyBvZiB0aGVcbiAgICogY2xhc3MuXG4gICAqXG4gICAqIEBwYXJhbSBkZWNsYXJhdGlvbiBhIFR5cGVTY3JpcHQgYHRzLkRlY2xhcmF0aW9uYCBub2RlIHJlcHJlc2VudGluZyB0aGUgY2xhc3Mgb3ZlciB3aGljaCB0b1xuICAgKiByZWZsZWN0LiBJZiB0aGUgc291cmNlIGlzIGluIEVTNiBmb3JtYXQsIHRoaXMgd2lsbCBiZSBhIGB0cy5DbGFzc0RlY2xhcmF0aW9uYCBub2RlLiBJZiB0aGVcbiAgICogc291cmNlIGlzIGluIEVTNSBmb3JtYXQsIHRoaXMgbWlnaHQgYmUgYSBgdHMuVmFyaWFibGVEZWNsYXJhdGlvbmAgYXMgY2xhc3NlcyBpbiBFUzUgYXJlXG4gICAqIHJlcHJlc2VudGVkIGFzIHRoZSByZXN1bHQgb2YgYW4gSUlGRSBleGVjdXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIGFycmF5IG9mIGBDbGFzc01lbWJlcmAgbWV0YWRhdGEgcmVwcmVzZW50aW5nIHRoZSBtZW1iZXJzIG9mIHRoZSBjbGFzcy5cbiAgICpcbiAgICogQHRocm93cyBpZiBgZGVjbGFyYXRpb25gIGRvZXMgbm90IHJlc29sdmUgdG8gYSBjbGFzcyBkZWNsYXJhdGlvbi5cbiAgICovXG4gIGdldE1lbWJlcnNPZkNsYXNzKGNsYXp6OiB0cy5EZWNsYXJhdGlvbik6IENsYXNzTWVtYmVyW107XG5cbiAgLyoqXG4gICAqIFJlZmxlY3Qgb3ZlciB0aGUgY29uc3RydWN0b3Igb2YgYSBjbGFzcyBhbmQgcmV0dXJuIG1ldGFkYXRhIGFib3V0IGl0cyBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBvbmx5IGxvb2tzIGF0IHRoZSBjb25zdHJ1Y3RvciBvZiBhIGNsYXNzIGRpcmVjdGx5IGFuZCBub3QgYXQgYW55IGluaGVyaXRlZFxuICAgKiBjb25zdHJ1Y3RvcnMuXG4gICAqXG4gICAqIEBwYXJhbSBkZWNsYXJhdGlvbiBhIFR5cGVTY3JpcHQgYHRzLkRlY2xhcmF0aW9uYCBub2RlIHJlcHJlc2VudGluZyB0aGUgY2xhc3Mgb3ZlciB3aGljaCB0b1xuICAgKiByZWZsZWN0LiBJZiB0aGUgc291cmNlIGlzIGluIEVTNiBmb3JtYXQsIHRoaXMgd2lsbCBiZSBhIGB0cy5DbGFzc0RlY2xhcmF0aW9uYCBub2RlLiBJZiB0aGVcbiAgICogc291cmNlIGlzIGluIEVTNSBmb3JtYXQsIHRoaXMgbWlnaHQgYmUgYSBgdHMuVmFyaWFibGVEZWNsYXJhdGlvbmAgYXMgY2xhc3NlcyBpbiBFUzUgYXJlXG4gICAqIHJlcHJlc2VudGVkIGFzIHRoZSByZXN1bHQgb2YgYW4gSUlGRSBleGVjdXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIGFuIGFycmF5IG9mIGBQYXJhbWV0ZXJgIG1ldGFkYXRhIHJlcHJlc2VudGluZyB0aGUgcGFyYW1ldGVycyBvZiB0aGUgY29uc3RydWN0b3IsIGlmXG4gICAqIGEgY29uc3RydWN0b3IgZXhpc3RzLiBJZiB0aGUgY29uc3RydWN0b3IgZXhpc3RzIGFuZCBoYXMgMCBwYXJhbWV0ZXJzLCB0aGlzIGFycmF5IHdpbGwgYmUgZW1wdHkuXG4gICAqIElmIHRoZSBjbGFzcyBoYXMgbm8gY29uc3RydWN0b3IsIHRoaXMgbWV0aG9kIHJldHVybnMgYG51bGxgLlxuICAgKi9cbiAgZ2V0Q29uc3RydWN0b3JQYXJhbWV0ZXJzKGRlY2xhcmF0aW9uOiB0cy5EZWNsYXJhdGlvbik6IFBhcmFtZXRlcltdfG51bGw7XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBpZiBhbiBpZGVudGlmaWVyIHdhcyBpbXBvcnRlZCBmcm9tIGFub3RoZXIgbW9kdWxlIGFuZCByZXR1cm4gYEltcG9ydGAgbWV0YWRhdGFcbiAgICogZGVzY3JpYmluZyBpdHMgb3JpZ2luLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgYSBUeXBlU2NyaXB0IGB0cy5JZGVudGlmZXJgIHRvIHJlZmxlY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIG1ldGFkYXRhIGFib3V0IHRoZSBgSW1wb3J0YCBpZiB0aGUgaWRlbnRpZmllciB3YXMgaW1wb3J0ZWQgZnJvbSBhbm90aGVyIG1vZHVsZSwgb3JcbiAgICogYG51bGxgIGlmIHRoZSBpZGVudGlmaWVyIGRvZXNuJ3QgcmVzb2x2ZSB0byBhbiBpbXBvcnQgYnV0IGluc3RlYWQgaXMgbG9jYWxseSBkZWZpbmVkLlxuICAgKi9cbiAgZ2V0SW1wb3J0T2ZJZGVudGlmaWVyKGlkOiB0cy5JZGVudGlmaWVyKTogSW1wb3J0fG51bGw7XG5cbiAgLyoqXG4gICAqIFRyYWNlIGFuIGlkZW50aWZpZXIgdG8gaXRzIGRlY2xhcmF0aW9uLCBpZiBwb3NzaWJsZS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgYXR0ZW1wdHMgdG8gcmVzb2x2ZSB0aGUgZGVjbGFyYXRpb24gb2YgdGhlIGdpdmVuIGlkZW50aWZpZXIsIHRyYWNpbmcgYmFjayB0aHJvdWdoXG4gICAqIGltcG9ydHMgYW5kIHJlLWV4cG9ydHMgdW50aWwgdGhlIG9yaWdpbmFsIGRlY2xhcmF0aW9uIHN0YXRlbWVudCBpcyBmb3VuZC4gQSBgRGVjbGFyYXRpb25gXG4gICAqIG9iamVjdCBpcyByZXR1cm5lZCBpZiB0aGUgb3JpZ2luYWwgZGVjbGFyYXRpb24gaXMgZm91bmQsIG9yIGBudWxsYCBpcyByZXR1cm5lZCBvdGhlcndpc2UuXG4gICAqXG4gICAqIElmIHRoZSBkZWNsYXJhdGlvbiBpcyBpbiBhIGRpZmZlcmVudCBtb2R1bGUsIGFuZCB0aGF0IG1vZHVsZSBpcyBpbXBvcnRlZCB2aWEgYW4gYWJzb2x1dGUgcGF0aCxcbiAgICogdGhpcyBtZXRob2QgYWxzbyByZXR1cm5zIHRoZSBhYnNvbHV0ZSBwYXRoIG9mIHRoZSBpbXBvcnRlZCBtb2R1bGUuIEZvciBleGFtcGxlLCBpZiB0aGUgY29kZSBpczpcbiAgICpcbiAgICogYGBgXG4gICAqIGltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAgICpcbiAgICogZXhwb3J0IGNvbnN0IFJPVVRFUyA9IFJvdXRlck1vZHVsZS5mb3JSb290KFsuLi5dKTtcbiAgICogYGBgXG4gICAqXG4gICAqIGFuZCBpZiBgZ2V0RGVjbGFyYXRpb25PZklkZW50aWZpZXJgIGlzIGNhbGxlZCBvbiBgUm91dGVyTW9kdWxlYCBpbiB0aGUgYFJPVVRFU2AgZXhwcmVzc2lvbixcbiAgICogdGhlbiBpdCB3b3VsZCB0cmFjZSBgUm91dGVyTW9kdWxlYCB2aWEgaXRzIGltcG9ydCBmcm9tIGBAYW5ndWxhci9jb3JlYCwgYW5kIG5vdGUgdGhhdCB0aGVcbiAgICogZGVmaW5pdGlvbiB3YXMgaW1wb3J0ZWQgZnJvbSBgQGFuZ3VsYXIvY29yZWAgaW50byB0aGUgYXBwbGljYXRpb24gd2hlcmUgaXQgd2FzIHJlZmVyZW5jZWQuXG4gICAqXG4gICAqIElmIHRoZSBkZWZpbml0aW9uIGlzIHJlLWV4cG9ydGVkIHNldmVyYWwgdGltZXMgZnJvbSBkaWZmZXJlbnQgYWJzb2x1dGUgbW9kdWxlIG5hbWVzLCBvbmx5XG4gICAqIHRoZSBmaXJzdCBvbmUgKHRoZSBvbmUgYnkgd2hpY2ggdGhlIGFwcGxpY2F0aW9uIHJlZmVycyB0byB0aGUgbW9kdWxlKSBpcyByZXR1cm5lZC5cbiAgICpcbiAgICogVGhpcyBtb2R1bGUgbmFtZSBpcyByZXR1cm5lZCBpbiB0aGUgYHZpYU1vZHVsZWAgZmllbGQgb2YgdGhlIGBEZWNsYXJhdGlvbmAuIElmIFRoZSBkZWNsYXJhdGlvblxuICAgKiBpcyByZWxhdGl2ZSB0byB0aGUgYXBwbGljYXRpb24gaXRzZWxmIGFuZCB0aGVyZSB3YXMgbm8gaW1wb3J0IHRocm91Z2ggYW4gYWJzb2x1dGUgcGF0aCwgdGhlblxuICAgKiBgdmlhTW9kdWxlYCBpcyBgbnVsbGAuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBhIFR5cGVTY3JpcHQgYHRzLklkZW50aWZpZXJgIHRvIHRyYWNlIGJhY2sgdG8gYSBkZWNsYXJhdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMgbWV0YWRhdGEgYWJvdXQgdGhlIGBEZWNsYXJhdGlvbmAgaWYgdGhlIG9yaWdpbmFsIGRlY2xhcmF0aW9uIGlzIGZvdW5kLCBvciBgbnVsbGBcbiAgICogb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ2V0RGVjbGFyYXRpb25PZklkZW50aWZpZXIoaWQ6IHRzLklkZW50aWZpZXIpOiBEZWNsYXJhdGlvbnxudWxsO1xuXG4gIC8qKlxuICAgKiBDb2xsZWN0IHRoZSBkZWNsYXJhdGlvbnMgZXhwb3J0ZWQgZnJvbSBhIG1vZHVsZSBieSBuYW1lLlxuICAgKlxuICAgKiBJdGVyYXRlcyBvdmVyIHRoZSBleHBvcnRzIG9mIGEgbW9kdWxlIChpbmNsdWRpbmcgcmUtZXhwb3J0cykgYW5kIHJldHVybnMgYSBtYXAgb2YgZXhwb3J0XG4gICAqIG5hbWUgdG8gaXRzIGBEZWNsYXJhdGlvbmAuIElmIGFuIGV4cG9ydGVkIHZhbHVlIGlzIGl0c2VsZiByZS1leHBvcnRlZCBmcm9tIGFub3RoZXIgbW9kdWxlLFxuICAgKiB0aGUgYERlY2xhcmF0aW9uYCdzIGB2aWFNb2R1bGVgIHdpbGwgcmVmbGVjdCB0aGF0LlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZSBhIFR5cGVTY3JpcHQgYHRzLk5vZGVgIHJlcHJlc2VudGluZyB0aGUgbW9kdWxlIChmb3IgZXhhbXBsZSBhIGB0cy5Tb3VyY2VGaWxlYCkgZm9yXG4gICAqIHdoaWNoIHRvIGNvbGxlY3QgZXhwb3J0cy5cbiAgICpcbiAgICogQHJldHVybnMgYSBtYXAgb2YgYERlY2xhcmF0aW9uYHMgZm9yIHRoZSBtb2R1bGUncyBleHBvcnRzLCBieSBuYW1lLlxuICAgKi9cbiAgZ2V0RXhwb3J0c09mTW9kdWxlKG1vZHVsZTogdHMuTm9kZSk6IE1hcDxzdHJpbmcsIERlY2xhcmF0aW9uPnxudWxsO1xuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiBkZWNsYXJhdGlvbiBub2RlIGFjdHVhbGx5IHJlcHJlc2VudHMgYSBjbGFzcy5cbiAgICovXG4gIGlzQ2xhc3Mobm9kZTogdHMuRGVjbGFyYXRpb24pOiBib29sZWFuO1xufVxuIl19